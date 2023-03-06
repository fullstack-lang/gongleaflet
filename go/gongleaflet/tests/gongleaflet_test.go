package tests

import (
	"testing"

	"github.com/fullstack-lang/gongleaflet/go/fullstack"
	"github.com/fullstack-lang/gongleaflet/go/models"
)

func TestGongLeaflet(t *testing.T) {

	stage, _ := fullstack.NewStackInstance(nil, "")

	displayTrackHistory := true
	visualTrack := (&models.VisualTrack{
		DisplayTrackHistory: displayTrackHistory,
	})

	visualTrack.Stage(stage)

	stage.Commit()

	visualTrack.Unstage(stage)

	stage.Commit()

}
