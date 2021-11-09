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

	displayTrackHistory := true
	visualTrack := (&models.VisualTrack{
		DisplayTrackHistory: displayTrackHistory,
	})

	visualTrack.Stage()

	models.Stage.Commit()

	visualTrack.Unstage()

	models.Stage.Commit()

}
