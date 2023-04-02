package main

import (
	"flag"
	"fmt"
	"log"
	"math"
	"os"
	"strings"
	"time"

	gongleaflet_go "github.com/fullstack-lang/gongleaflet/go"
	gongleaflet_fullstack "github.com/fullstack-lang/gongleaflet/go/fullstack"
	gongleaflet_models "github.com/fullstack-lang/gongleaflet/go/models"
	gongleaflet_static "github.com/fullstack-lang/gongleaflet/go/static"

	gongleaflet_icons "github.com/fullstack-lang/gongleaflet/go/icons"

	gongdoc_load "github.com/fullstack-lang/gongdoc/go/load"
)

var (
	logDBFlag  = flag.Bool("logDB", false, "log mode for db")
	logGINFlag = flag.Bool("logGIN", false, "log mode for gin")

	marshallOnStartup  = flag.String("marshallOnStartup", "", "at startup, marshall staged data to a go file with the marshall name and '.go' (must be lowercased without spaces). If marshall arg is '', no marshalling")
	unmarshallFromCode = flag.String("unmarshallFromCode", "", "unmarshall data from go file and '.go' (must be lowercased without spaces), If unmarshallFromCode arg is '', no unmarshalling")
	unmarshall         = flag.String("unmarshall", "", "unmarshall data from marshall name and '.go' (must be lowercased without spaces), If unmarshall arg is '', no unmarshalling")
	marshallOnCommit   = flag.String("marshallOnCommit", "", "on all commits, marshall staged data to a go file with the marshall name and '.go' (must be lowercased without spaces). If marshall arg is '', no marshalling")

	diagrams         = flag.Bool("diagrams", true, "parse/analysis go/models and go/diagrams")
	embeddedDiagrams = flag.Bool("embeddedDiagrams", false, "parse/analysis go/models and go/embeddedDiagrams")
)

// InjectionGateway is the singloton that stores all functions
// that can set the objects the stage
// InjectionGateway stores function as a map of names
var InjectionGateway = make(map[string](func()))

// hook marhalling to stage
type BeforeCommitImplementation struct {
}

func (impl *BeforeCommitImplementation) BeforeCommit(stage *gongleaflet_models.StageStruct) {
	file, err := os.Create(fmt.Sprintf("./%s.go", *marshallOnCommit))
	if err != nil {
		log.Fatal(err.Error())
	}
	defer file.Close()

	stage.Checkout()
	stage.Marshall(file, "github.com/fullstack-lang/gongleaflet/go/models", "main")
}

func main() {

	log.SetPrefix("gongleaflet: ")
	log.SetFlags(0)

	// parse program arguments
	flag.Parse()

	// setup the static file server and get the controller
	r := gongleaflet_static.ServeStaticFiles(*logGINFlag)

	// setup stack
	stage := gongleaflet_fullstack.NewStackInstance(r, "github.com/fullstack-lang/gongleaflet/go/models")

	// generate injection code from the stage
	if *marshallOnStartup != "" {

		if strings.Contains(*marshallOnStartup, " ") {
			log.Fatalln(*marshallOnStartup + " must not contains blank spaces")
		}
		if strings.ToLower(*marshallOnStartup) != *marshallOnStartup {
			log.Fatalln(*marshallOnStartup + " must be lowercases")
		}

		file, err := os.Create(fmt.Sprintf("./%s.go", *marshallOnStartup))
		if err != nil {
			log.Fatal(err.Error())
		}
		defer file.Close()

		stage.Checkout()
		stage.Marshall(file, "github.com/fullstack-lang/gongleaflet/go/models", "main")
		os.Exit(0)
	}

	// setup the stage by injecting the code from code database
	if *unmarshall != "" {
		stage.Checkout()
		stage.Reset()
		stage.Commit()
		if InjectionGateway[*unmarshall] != nil {
			InjectionGateway[*unmarshall]()
		}
		stage.Commit()
	} else {
		// in case the database is used, checkout the content to the stage
		stage.Checkout()
	}

	if *unmarshallFromCode != "" {
		stage.Checkout()
		stage.Reset()
		stage.Commit()
		err := gongleaflet_models.ParseAstFile(stage, *unmarshallFromCode)

		// if the application is run with -unmarshallFromCode=xxx.go -marshallOnCommit
		// xxx.go might be absent the first time. However, this shall not be a show stopper.
		if err != nil {
			log.Println("no file to read " + err.Error())
		}

		stage.Commit()
	} else {
		// in case the database is used, checkout the content to the stage
		stage.Checkout()
	}

	// hook automatic marshall to go code at every commit
	if *marshallOnCommit != "" {
		hook := new(BeforeCommitImplementation)
		stage.OnInitCommitFromFrontCallback = hook
	}

	gongdoc_load.Load(
		"gongleaflet",
		"github.com/fullstack-lang/gongleaflet/go/models",
		gongleaflet_go.GoModelsDir,
		gongleaflet_go.GoDiagramsDir,
		r,
		*embeddedDiagrams,
		&stage.Map_GongStructName_InstancesNb)

	gongleaflet_icons.LoadIcons(stage)

	//
	// Set up LayerGroup
	//
	AirportLayer := new(gongleaflet_models.LayerGroup).Stage(stage)
	AirportLayer.Name = "Airport Layer"
	AirportLayer.DisplayName = "Airport Layer"

	RadarLayer := new(gongleaflet_models.LayerGroup).Stage(stage)
	RadarLayer.Name = "Radar Layer"
	RadarLayer.DisplayName = "Radar Layer"

	TracksLayer := new(gongleaflet_models.LayerGroup).Stage(stage)
	TracksLayer.Name = "Tracks Layer"
	TracksLayer.DisplayName = "Tracks Layer"

	//
	// Set up Markers
	//
	LyonAirport := new(gongleaflet_models.Marker).Stage(stage)
	LyonAirport.Lat = 46
	LyonAirport.Lng = 5.5
	LyonAirport.Name = "Lyon's Airport"
	LyonAirport.LayerGroup = AirportLayer
	LyonAirport.DivIcon = gongleaflet_icons.AirTrafficControler
	LyonAirport.ColorEnum = gongleaflet_models.GREEN

	LyonRadar := new(gongleaflet_models.Marker).Stage(stage)
	LyonRadar.Lat = 46
	LyonRadar.Lng = 5
	LyonRadar.Name = "Lyon's Radar"
	LyonRadar.LayerGroup = RadarLayer
	LyonRadar.DivIcon = gongleaflet_icons.Radar
	LyonRadar.ColorEnum = gongleaflet_models.BLUE

	LyonRadarDot := new(gongleaflet_models.Marker).Stage(stage)
	LyonRadarDot.Lat = 45.5
	LyonRadarDot.Lng = 3.7
	LyonRadarDot.Name = "Dot"
	LyonRadarDot.LayerGroup = RadarLayer
	LyonRadarDot.DivIcon = gongleaflet_icons.Dot_10Icon
	LyonRadarDot.ColorEnum = gongleaflet_models.BLUE

	//
	// Set up Circles
	//
	LyonRadarRange := new(gongleaflet_models.Circle).Stage(stage)
	LyonRadarRange.Lat = 46
	LyonRadarRange.Lng = 5
	LyonRadarRange.Name = "Lyon's Radar Range"
	LyonRadarRange.LayerGroup = RadarLayer
	LyonRadarRange.Radius = 100
	LyonRadarRange.ColorEnum = gongleaflet_models.LIGHT_BROWN_8D6E63
	LyonRadarRange.DashStyleEnum = gongleaflet_models.FIVE_TWENTY

	//
	// Line
	//
	TestLine := new(gongleaflet_models.VLine).Stage(stage)
	TestLine.StartLat = 46
	TestLine.StartLng = 5
	TestLine.EndLat = 42
	TestLine.EndLng = 6
	TestLine.Name = "Test line"
	TestLine.LayerGroup = RadarLayer
	TestLine.ColorEnum = gongleaflet_models.RED
	TestLine.DashStyleEnum = gongleaflet_models.FIVE_TWENTY

	//
	// Visual Map
	//
	Map1 := new(gongleaflet_models.MapOptions).Stage(stage)
	Map1.Name = "Map1"
	Map1.UrlTemplate = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"

	// inspiration from https://github.com/consbio/mbtileserver
	Map1.UrlTemplate = "http://localhost:3650/api/tiles/2017-07-03_europe/{z}/{x}/{y}.pbf"
	Map1.UrlTemplate = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
	Map1.Attribution = "osm"
	Map1.ZoomLevel = 7.0
	Map1.ZoomSnap = 1.0
	Map1.MaxZoom = 18.0
	Map1.Lat = 45
	Map1.Lng = 5

	Map1AirportLayerUse := new(gongleaflet_models.LayerGroupUse).Stage(stage)
	Map1AirportLayerUse.Name = "Map1AirportLayerUse"
	Map1AirportLayerUse.LayerGroup = AirportLayer
	Map1AirportLayerUse.Display = true
	Map1.LayerGroupUses = append(Map1.LayerGroupUses, Map1AirportLayerUse)

	Map1RadarLayerUse := new(gongleaflet_models.LayerGroupUse).Stage(stage)
	Map1RadarLayerUse.Name = "Map1RadarLayerUse"
	Map1RadarLayerUse.LayerGroup = RadarLayer
	Map1RadarLayerUse.Display = true
	Map1.LayerGroupUses = append(Map1.LayerGroupUses, Map1RadarLayerUse)

	Map1TracksLayerUse := new(gongleaflet_models.LayerGroupUse).Stage(stage)
	Map1TracksLayerUse.Name = "Map1TracksLayerUse"
	Map1TracksLayerUse.LayerGroup = TracksLayer
	Map1TracksLayerUse.Display = true
	Map1.LayerGroupUses = append(Map1.LayerGroupUses, Map1TracksLayerUse)

	Map2 := new(gongleaflet_models.MapOptions).Stage(stage)
	Map2.Name = "Map2"
	Map2.UrlTemplate = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
	Map2.Attribution = "osm"
	Map2.ZoomLevel = 5.0
	Map2.ZoomSnap = 1.0
	Map2.MaxZoom = 18.0
	Map2.Lat = 45
	Map2.Lng = 3

	Map2AirportLayerUse := new(gongleaflet_models.LayerGroupUse).Stage(stage)
	Map2AirportLayerUse.Name = "Map2RadarLayerUse"
	Map2AirportLayerUse.LayerGroup = AirportLayer
	Map2.LayerGroupUses = append(Map2.LayerGroupUses, Map2AirportLayerUse)

	Map2RadarLayerUse := new(gongleaflet_models.LayerGroupUse).Stage(stage)
	Map2RadarLayerUse.Name = "Map2RadarLayerUse"
	Map2RadarLayerUse.LayerGroup = RadarLayer
	Map2.LayerGroupUses = append(Map2.LayerGroupUses, Map2RadarLayerUse)

	Map2TracksLayerUse := new(gongleaflet_models.LayerGroupUse).Stage(stage)
	Map2TracksLayerUse.Name = "Map2TracksLayerUse"
	Map2TracksLayerUse.LayerGroup = TracksLayer
	Map2.LayerGroupUses = append(Map2.LayerGroupUses, Map2TracksLayerUse)

	//
	// Tracks
	//
	InitialLat := 44.0
	InitialLng := 4.0
	Radius := 1.0
	Speed := 300.0
	Level := 200.0

	Plane := new(gongleaflet_models.VisualTrack).Stage(stage)
	Plane.Lat = InitialLat + Radius
	Plane.Lng = InitialLng
	Plane.Name = "Plane Track"
	Plane.LayerGroup = TracksLayer
	Plane.DivIcon = gongleaflet_icons.Airplane
	Plane.ColorEnum = gongleaflet_models.GREEN
	Plane.Heading = 130
	Plane.Level = Level
	Plane.Speed = Speed
	Plane.VerticalSpeed = 30
	Plane.DisplayTrackHistory = true
	Plane.DisplayLevelAndSpeed = true

	//
	// Tracks
	//

	Sat := new(gongleaflet_models.VisualTrack).Stage(stage)
	Sat.Lat = InitialLat + 1.0
	Sat.Lng = InitialLng + 1.0
	Sat.Name = "Sat Track"
	Sat.LayerGroup = TracksLayer
	Sat.DivIcon = gongleaflet_icons.Satellite
	Sat.ColorEnum = gongleaflet_models.GREEN
	Sat.Heading = 130
	Sat.Level = Level
	Sat.Speed = Speed
	Sat.VerticalSpeed = 30
	Sat.DisplayTrackHistory = true
	Sat.DisplayLevelAndSpeed = true

	stage.Commit()

	ticker := time.NewTicker(500 * time.Millisecond)
	done := make(chan bool)

	gongleaflet_models.DefaultLayerGroup = (&gongleaflet_models.LayerGroup{
		Name: "Default",
	}).Stage(stage)

	go func() {
		for {
			select {
			case <-done:
				return
			case t := <-ticker.C:
				// fmt.Println("Tick at", t.Second(), " Plane lat ", Plane.Lat,
				// 	" commit from the front ", stage.BackRepo.GetLastPushFromFrontNb())

				// let's make a circle
				Plane.Lat = InitialLat + Radius*math.Cos(float64(t.Second())/15.0*math.Pi)
				Plane.Lng = InitialLng + Radius*math.Sin(float64(t.Second())/15.0*math.Pi)
				Plane.Heading = 180.0*(float64(t.Second())/15.0) + 90
				Plane.Speed = Speed + 20*math.Sin(float64(t.Second())/15.0*math.Pi)
				Plane.Level = Level + 20*math.Sin(float64(t.Second())/15.0*math.Pi)

				Plane.Lat = Plane.Lat + 0.01
				stage.Commit()
			}
		}
	}()

	log.Printf("Server ready serve on localhost:8080")
	r.Run()
}
