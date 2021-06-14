package tests

import (
	"testing"

	"github.com/fullstack-lang/gongleaflet/go/models"
	"github.com/fullstack-lang/gongleaflet/go/orm"
)

func TestBackupTest(t *testing.T) {

	// setup GORM
	db := orm.SetupModels(false, "../../test.db")

	// initiate back repo a callback functions
	orm.BackRepo.Init(db)

	models.Stage.Checkout()

	models.Stage.Backup("bckp-test")
}

func TestRestoreTest(t *testing.T) {

	// setup GORM
	db := orm.SetupModels(false, "../../test.db")

	// initiate back repo a callback functions
	orm.BackRepo.Init(db)

	models.Stage.Restore("bckp-test")

	models.Stage.Commit()
}
