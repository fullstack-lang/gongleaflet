package tests

import (
	"testing"

	gongleaflet_fullstack "github.com/fullstack-lang/gongleaflet/go/fullstack"
	gongleaflet_models "github.com/fullstack-lang/gongleaflet/go/models"
	gongleaflet_static "github.com/fullstack-lang/gongleaflet/go/static"
)

func TestGongLeaflet(t *testing.T) {

	r := gongleaflet_static.ServeStaticFiles(false)

	gongleafletStage := gongleaflet_fullstack.NewStackInstance(r, "")

	// update visual track
	AirportLayer := new(gongleaflet_models.LayerGroup).Stage(gongleafletStage)
	AirportLayer.Name = "Airport Layer"
	AirportLayer.DisplayName = "Airport Layer"

	gongleaflet_models.ComputeLayerGroupFromLayerGroupName(gongleafletStage, "Airport Layer")

	// update the visual track from the update of tje underlying object
	movingObject := new(MovingObject)

	visualTrack := gongleaflet_models.AttachVisualTrack(gongleafletStage, movingObject, nil, gongleaflet_models.GREEN, false, true)
	visualLine := gongleaflet_models.AttachLine(gongleafletStage, movingObject, gongleaflet_models.FIVE_TEN)
	visualMarker := gongleaflet_models.AttachMarker(gongleafletStage, movingObject, gongleaflet_models.BLUE, nil)

	visualTrack.UpdateTrack()
	visualLine.UpdateLine()
	visualMarker.UpdateMarker()

	gongleafletStage.Commit()

	visualTrack.Unstage(gongleafletStage)

	gongleafletStage.Commit()

}
