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

	"github.com/fullstack-lang/gongleaflet/go/controllers"
	"github.com/fullstack-lang/gongleaflet/go/models"
	"github.com/fullstack-lang/gongleaflet/go/orm"
)

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
		db := orm.SetupModels(*logDBFlag, "./test.db")
		// mandatory, otherwise, bizarre errors occurs
		db.DB().SetMaxOpenConns(1)
		orm.AutoMigrate(db)
		orm.BackRepo.Init(db)
		models.Stage.Checkout()
		models.Stage.Backup("bckp")

		return
	}
	if *restoreFlag {

		// setup GORM
		db := orm.SetupModels(*logDBFlag, "./test.db")
		// mandatory, otherwise, bizarre errors occurs
		db.DB().SetMaxOpenConns(1)
		orm.AutoMigrate(db)
		orm.BackRepo.Init(db)
		models.Stage.Restore("bckp")

		return
	}

	// setup GORM
	db := orm.SetupModels(*logDBFlag, "./test.db")
	orm.BackRepo.Init(db)

	// setup controlers
	if !*logGINFlag {
		myfile, _ := os.Create("/tmp/server.log")
		gin.DefaultWriter = myfile
	}
	r := gin.Default()
	r.Use(cors.Default())

	controllers.RegisterControllers(r)
	r.Use(static.Serve("/", EmbedFolder(ng, "ng/dist/ng")))
	r.NoRoute(func(c *gin.Context) {
		fmt.Println(c.Request.URL.Path, "doesn't exists, redirect on /")
		c.Redirect(http.StatusMovedPermanently, "/")
		c.Abort()
	})

	log.Printf("Server ready serve on localhost:8080")

	r.Run()
}
