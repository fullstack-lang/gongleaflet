package tests

import (
	"testing"

	"github.com/fullstack-lang/gongleaflet/go/models"
	"github.com/fullstack-lang/gongleaflet/go/orm"
)

//
func TestGongLeaflet(t *testing.T) {

	// setup GORM
	orm.SetupModels(true, ":memory:")

	display := true
	displayTrackHistory := true
	DisplayLevelAndSpeed := true
	visualTrack := (&models.VisualTrack{
		Display:              display,
		DisplayTrackHistory:  displayTrackHistory,
		DisplayLevelAndSpeed: DisplayLevelAndSpeed,
	})

	visualTrack.Stage()

	models.Stage.Commit()

	visualTrack.Unstage()

	models.Stage.Commit()

}
