package tests

import (
	"testing"

	"github.com/fullstack-lang/gongleaflet/go/fullstack"
	"github.com/fullstack-lang/gongleaflet/go/models"
	"github.com/fullstack-lang/gongleaflet/go/static"
)

func TestGongLeaflet(t *testing.T) {

	r := static.ServeStaticFiles(false)

	stage := fullstack.NewStackInstance(r, "")

	displayTrackHistory := true
	visualTrack := (&models.VisualTrack{
		DisplayTrackHistory: displayTrackHistory,
	})

	visualTrack.Stage(stage)

	stage.Commit()

	visualTrack.Unstage(stage)

	stage.Commit()

}
