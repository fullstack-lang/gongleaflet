package tests

import (
	"testing"

	"github.com/fullstack-lang/gongleaflet/go/models"
	"github.com/fullstack-lang/gongleaflet/go/orm"
)

func TestBackupTest(t *testing.T) {

	// setup GORM
	orm.SetupModels(false, "../../test.db")

	models.Stage.Checkout()

	models.Stage.Backup("bckp-test")
}

func TestRestoreTest(t *testing.T) {

	// setup GORM
	orm.SetupModels(false, "../../test.db")

	models.Stage.Restore("bckp-test")

	models.Stage.Commit()
}
