package tests

type MovingObject struct {
	Name string

	// current position
	Lat float64
	Lng float64

	// heading in degrees
	Heading float64

	// level
	// for instance 210 means 21 000 feets
	Level float64

	// Horizonatl Speed, in km/h
	Speed float64
}

// functions to satisty the visual interface for track
func (movingObject *MovingObject) GetName() string     { return movingObject.Name }
func (movingObject *MovingObject) GetLat() float64     { return movingObject.Lat }
func (movingObject *MovingObject) GetLng() float64     { return movingObject.Lng }
func (movingObject *MovingObject) GetHeading() float64 { return movingObject.Heading }

// speed is displayed in tens of nautical miles
func (movingObject *MovingObject) GetSpeed() float64 {
	return movingObject.Speed / 18.52
}
func (movingObject *MovingObject) GetVerticalSpeed() float64 { return 0.0 }
func (movingObject *MovingObject) GetLevel() float64         { return movingObject.Level }

// specific
// func (movingObject *MovingObject) GetColorEnum() ColorEnum { return GREY }

func (movingObject *MovingObject) GetDisplay() bool { return true }

func (*MovingObject) GetLayerGroupName() (name string) { return "" }
