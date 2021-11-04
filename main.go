package main

import (
	"embed"
	"io/fs"

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
)

//
// Set up Icons
//

//go:embed icons/radar.svg
var radar string
var RadarIcon *gongleaflet_models.DivIcon = (&gongleaflet_models.DivIcon{
	Name: "Radar",
	SVG:  radar,
})

//go:embed icons/air_traffic_controler.svg
var air_traffic_controler string
var AirTrafficControlerIcon *gongleaflet_models.DivIcon = (&gongleaflet_models.DivIcon{
	Name: "AirTrafficControler",
	SVG:  air_traffic_controler,
})

//go:embed icons/airplane.svg
var airplane string
var AirplaneIcon *gongleaflet_models.DivIcon = (&gongleaflet_models.DivIcon{
	Name: "Airplane",
	SVG:  airplane,
})

var (
	logDBFlag  = flag.Bool("logDB", false, "log mode for db")
	logGINFlag = flag.Bool("logGIN", false, "log mode for gin")
	apiFlag    = flag.Bool("api", false, "it true, use api controllers instead of default controllers")

	backupFlag  = flag.Bool("backup", false, "read database file, generate backup and exits")
	restoreFlag = flag.Bool("restore", false, "generate restore and exits")
)

//go:embed ng/dist/ng
var ng embed.FS

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
	gongleaflet_orm.SetupModels(*logDBFlag, "./test.db")

	// setup controlers
	if !*logGINFlag {
		myfile, _ := os.Create("/tmp/server.log")
		gin.DefaultWriter = myfile
	}
	r := gin.Default()
	r.Use(cors.Default())

	gongleaflet_controllers.RegisterControllers(r)
	r.Use(static.Serve("/", EmbedFolder(ng, "ng/dist/ng")))
	r.NoRoute(func(c *gin.Context) {
		fmt.Println(c.Request.URL.Path, "doesn't exists, redirect on /")
		c.Redirect(http.StatusMovedPermanently, "/")
		c.Abort()
	})

	// setup test dataset
	// reset the database
	gongleaflet_models.Stage.Checkout()
	gongleaflet_models.Stage.Reset()
	gongleaflet_models.Stage.Commit()

	//
	// restage the 3 icons
	//
	AirplaneIcon.Stage()
	RadarIcon.Stage()
	AirTrafficControlerIcon.Stage()

	//
	// Set up LayerGroup
	//
	MarkersLayer1 := new(gongleaflet_models.LayerGroup).Stage()
	MarkersLayer1.Name = "Markers Layer 1"
	MarkersLayer1.DisplayName = "Markers Layer 1"

	MarkersLayer2 := new(gongleaflet_models.LayerGroup).Stage()
	MarkersLayer2.Name = "Markers Layer 2"
	MarkersLayer2.DisplayName = "Markers Layer 2"

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
	LyonAirport.LayerGroup = MarkersLayer1
	LyonAirport.DivIcon = AirTrafficControlerIcon
	LyonAirport.ColorEnum = gongleaflet_models.GREEN

	LyonRadar := new(gongleaflet_models.Marker).Stage()
	LyonRadar.Lat = 46
	LyonRadar.Lng = 5
	LyonRadar.Name = "Lyon's Radar"
	LyonRadar.LayerGroup = MarkersLayer2
	LyonRadar.DivIcon = RadarIcon
	LyonRadar.ColorEnum = gongleaflet_models.BLUE

	//
	// Set up Circles
	//
	LyonRadarRange := new(gongleaflet_models.VisualCircle).Stage()
	LyonRadarRange.Lat = 46
	LyonRadarRange.Lng = 5
	LyonRadarRange.Name = "Lyon's Radar Range"
	LyonRadarRange.LayerGroup = MarkersLayer2
	LyonRadarRange.Radius = 100
	LyonRadarRange.ColorEnum = gongleaflet_models.LIGHT_BROWN_8D6E63
	LyonRadarRange.DashStyleEnum = gongleaflet_models.FIVE_TWENTY

	//
	// Line
	//
	TestLine := new(gongleaflet_models.VisualLine).Stage()
	TestLine.StartLat = 46
	TestLine.StartLng = 5
	TestLine.EndLat = 42
	TestLine.EndLng = 6
	TestLine.Name = "Test line"
	TestLine.LayerGroup = MarkersLayer2
	TestLine.ColorEnum = gongleaflet_models.RED
	TestLine.DashStyleEnum = gongleaflet_models.FIVE_TWENTY

	//
	// Visual Map
	//
	Map1 := new(gongleaflet_models.MapOptions).Stage()
	Map1.Name = "Map1"
	Map1.UrlTemplate = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
	Map1.Attribution = "osm"
	Map1.ZoomLevel = 7.0
	Map1.ZoomSnap = 1.0
	Map1.MaxZoom = 18.0
	Map1.Lat = 45
	Map1.Lng = 5

	Map2 := new(gongleaflet_models.MapOptions).Stage()
	Map2.Name = "Map2"
	Map2.UrlTemplate = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
	Map2.Attribution = "osm"
	Map2.ZoomLevel = 5.0
	Map2.ZoomSnap = 1.0
	Map2.MaxZoom = 18.0
	Map2.Lat = 45
	Map2.Lng = 3

	//
	// Tracks
	//
	Plane := new(gongleaflet_models.VisualTrack).Stage()
	Plane.Lat = 46
	Plane.Lng = 4
	Plane.Name = "Plane Track"
	Plane.LayerGroup = TracksLayer
	Plane.DivIcon = AirplaneIcon
	Plane.ColorEnum = gongleaflet_models.GREEN
	Plane.Heading = 130
	Plane.Level = 220
	Plane.Speed = 300
	Plane.VerticalSpeed = 30

	gongleaflet_models.Stage.Commit()

	log.Printf("Server ready serve on localhost:8080")

	r.Run()
}
