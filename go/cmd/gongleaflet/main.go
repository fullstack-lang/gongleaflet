package main

import (
	"embed"
	"io/fs"
	"math"
	"time"

	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"

	gongleaflet_controllers "github.com/fullstack-lang/gongleaflet/go/controllers"
	gongleaflet_models "github.com/fullstack-lang/gongleaflet/go/models"
	gongleaflet_orm "github.com/fullstack-lang/gongleaflet/go/orm"

	gongleaflet_icons "github.com/fullstack-lang/gongleaflet/go/icons"

	gongleaflet "github.com/fullstack-lang/gongleaflet"
)

//
// Set up Icons
//

// //go:embed icons/radar.svg
// var radar string
// var RadarIcon *gongleaflet_models.DivIcon = (&gongleaflet_models.DivIcon{
// 	Name: "Radar",
// 	SVG:  radar,
// })

// //go:embed icons/air_traffic_controler.svg
// var air_traffic_controler string
// var AirTrafficControlerIcon *gongleaflet_models.DivIcon = (&gongleaflet_models.DivIcon{
// 	Name: "AirTrafficControler",
// 	SVG:  air_traffic_controler,
// })

// //go:embed icons/airplane.svg
// var airplane string
// var AirplaneIcon *gongleaflet_models.DivIcon = (&gongleaflet_models.DivIcon{
// 	Name: "Airplane",
// 	SVG:  airplane,
// })

var (
	logDBFlag  = flag.Bool("logDB", false, "log mode for db")
	logGINFlag = flag.Bool("logGIN", false, "log mode for gin")

	backupFlag  = flag.Bool("backup", false, "read database file, generate backup and exits")
	restoreFlag = flag.Bool("restore", false, "generate restore and exits")
)

type embedFileSystem struct {
	http.FileSystem
}

func (e embedFileSystem) Exists(prefix string, path string) bool {
	_, err := e.Open(path)
	return err == nil
}

func EmbedFolder(fsEmbed embed.FS, targetPath string) static.ServeFileSystem {
	fsys, err := fs.Sub(fsEmbed, targetPath)
	if err != nil {
		panic(err)
	}
	return embedFileSystem{
		FileSystem: http.FS(fsys),
	}
}

func main() {

	log.SetPrefix("gongleaflet: ")
	log.SetFlags(0)

	flag.Parse()
	if len(flag.Args()) > 0 {
		log.Fatal("surplus arguments")
	}

	if *backupFlag {

		// setup GORM
		db := gongleaflet_orm.SetupModels(*logDBFlag, "./test.db")
		// mandatory, otherwise, bizarre errors occurs
		gongleaflet_orm.AutoMigrate(db)
		gongleaflet_models.Stage.Checkout()
		gongleaflet_models.Stage.Backup("bckp")

		return
	}
	if *restoreFlag {

		// setup GORM
		db := gongleaflet_orm.SetupModels(*logDBFlag, "./test.db")
		// mandatory, otherwise, bizarre errors occurs
		gongleaflet_orm.AutoMigrate(db)
		gongleaflet_models.Stage.Restore("bckp")

		return
	}

	// setup GORM
	db := gongleaflet_orm.SetupModels(*logDBFlag, ":memory:")
	// since gongsim is a multi threaded application. It is important to set up
	// only one open connexion at a time
	dbDB, err := db.DB()
	if err != nil {
		panic("cannot access DB of db" + err.Error())
	}
	dbDB.SetMaxOpenConns(1)

	// setup controlers
	if !*logGINFlag {
		myfile, _ := os.Create("/tmp/server.log")
		gin.DefaultWriter = myfile
	}
	r := gin.Default()
	r.Use(cors.Default())

	gongleaflet_controllers.RegisterControllers(r)
	r.Use(static.Serve("/", EmbedFolder(gongleaflet.NgDistNg, "ng/dist/ng")))
	r.NoRoute(func(c *gin.Context) {
		fmt.Println(c.Request.URL.Path, "doesn't exists, redirect on /")
		c.Redirect(http.StatusMovedPermanently, "/")
		c.Abort()
	})

	//
	// Set up LayerGroup
	//
	AirportLayer := new(gongleaflet_models.LayerGroup).Stage()
	AirportLayer.Name = "Airport Layer"
	AirportLayer.DisplayName = "Airport Layer"

	RadarLayer := new(gongleaflet_models.LayerGroup).Stage()
	RadarLayer.Name = "Radar Layer"
	RadarLayer.DisplayName = "Radar Layer"

	TracksLayer := new(gongleaflet_models.LayerGroup).Stage()
	TracksLayer.Name = "Tracks Layer"
	TracksLayer.DisplayName = "Tracks Layer"

	//
	// Set up Markers
	//
	LyonAirport := new(gongleaflet_models.Marker).Stage()
	LyonAirport.Lat = 46
	LyonAirport.Lng = 5.5
	LyonAirport.Name = "Lyon's Airport"
	LyonAirport.LayerGroup = AirportLayer
	LyonAirport.DivIcon = gongleaflet_icons.AirTrafficControler
	LyonAirport.ColorEnum = gongleaflet_models.GREEN

	LyonRadar := new(gongleaflet_models.Marker).Stage()
	LyonRadar.Lat = 46
	LyonRadar.Lng = 5
	LyonRadar.Name = "Lyon's Radar"
	LyonRadar.LayerGroup = RadarLayer
	LyonRadar.DivIcon = gongleaflet_icons.Radar
	LyonRadar.ColorEnum = gongleaflet_models.BLUE

	LyonRadarDot := new(gongleaflet_models.Marker).Stage()
	LyonRadarDot.Lat = 45.5
	LyonRadarDot.Lng = 3.7
	LyonRadarDot.Name = "Dot"
	LyonRadarDot.LayerGroup = RadarLayer
	LyonRadarDot.DivIcon = gongleaflet_icons.Dot_10Icon
	LyonRadarDot.ColorEnum = gongleaflet_models.BLUE

	//
	// Set up Circles
	//
	LyonRadarRange := new(gongleaflet_models.Circle).Stage()
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
	TestLine := new(gongleaflet_models.VLine).Stage()
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
	Map1 := new(gongleaflet_models.MapOptions).Stage()
	Map1.Name = "Map1"
	Map1.UrlTemplate = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"

	// inspiration from https://github.com/consbio/mbtileserver
	Map1.UrlTemplate = "http://localhost:3650/api/tiles/2017-07-03_europe/{z}/{x}/{y}.pbf"
	Map1.Attribution = "osm"
	Map1.ZoomLevel = 7.0
	Map1.ZoomSnap = 1.0
	Map1.MaxZoom = 18.0
	Map1.Lat = 45
	Map1.Lng = 5

	Map1AirportLayerUse := new(gongleaflet_models.LayerGroupUse).Stage()
	Map1AirportLayerUse.Name = "Map1AirportLayerUse"
	Map1AirportLayerUse.LayerGroup = AirportLayer
	Map1AirportLayerUse.Display = true
	Map1.LayerGroupUses = append(Map1.LayerGroupUses, Map1AirportLayerUse)

	Map1RadarLayerUse := new(gongleaflet_models.LayerGroupUse).Stage()
	Map1RadarLayerUse.Name = "Map1RadarLayerUse"
	Map1RadarLayerUse.LayerGroup = RadarLayer
	Map1RadarLayerUse.Display = true
	Map1.LayerGroupUses = append(Map1.LayerGroupUses, Map1RadarLayerUse)

	Map1TracksLayerUse := new(gongleaflet_models.LayerGroupUse).Stage()
	Map1TracksLayerUse.Name = "Map1TracksLayerUse"
	Map1TracksLayerUse.LayerGroup = TracksLayer
	Map1TracksLayerUse.Display = true
	Map1.LayerGroupUses = append(Map1.LayerGroupUses, Map1TracksLayerUse)

	Map2 := new(gongleaflet_models.MapOptions).Stage()
	Map2.Name = "Map2"
	Map2.UrlTemplate = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
	Map2.Attribution = "osm"
	Map2.ZoomLevel = 5.0
	Map2.ZoomSnap = 1.0
	Map2.MaxZoom = 18.0
	Map2.Lat = 45
	Map2.Lng = 3

	Map2AirportLayerUse := new(gongleaflet_models.LayerGroupUse).Stage()
	Map2AirportLayerUse.Name = "Map2RadarLayerUse"
	Map2AirportLayerUse.LayerGroup = AirportLayer
	Map2.LayerGroupUses = append(Map2.LayerGroupUses, Map2AirportLayerUse)

	Map2RadarLayerUse := new(gongleaflet_models.LayerGroupUse).Stage()
	Map2RadarLayerUse.Name = "Map2RadarLayerUse"
	Map2RadarLayerUse.LayerGroup = RadarLayer
	Map2.LayerGroupUses = append(Map2.LayerGroupUses, Map2RadarLayerUse)

	Map2TracksLayerUse := new(gongleaflet_models.LayerGroupUse).Stage()
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

	Plane := new(gongleaflet_models.VisualTrack).Stage()
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

	gongleaflet_models.Stage.Commit()

	log.Printf("Server ready serve on localhost:8080")

	ticker := time.NewTicker(500 * time.Millisecond)
	done := make(chan bool)

	go func() {
		for {
			select {
			case <-done:
				return
			case t := <-ticker.C:
				// fmt.Println("Tick at", t.Second(), " Plane lat ", Plane.Lat,
				// 	" commit from the front ", gongleaflet_models.Stage.BackRepo.GetLastPushFromFrontNb())

				// let's make a circle
				Plane.Lat = InitialLat + Radius*math.Cos(float64(t.Second())/15.0*math.Pi)
				Plane.Lng = InitialLng + Radius*math.Sin(float64(t.Second())/15.0*math.Pi)
				Plane.Heading = 180.0*(float64(t.Second())/15.0) + 90
				Plane.Speed = Speed + 20*math.Sin(float64(t.Second())/15.0*math.Pi)
				Plane.Level = Level + 20*math.Sin(float64(t.Second())/15.0*math.Pi)

				Plane.Lat = Plane.Lat + 0.01
				gongleaflet_models.Stage.Commit()
			}
		}
	}()

	r.Run()
}
