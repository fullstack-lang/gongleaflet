package models

// DivIcon is the go implementation of the leaflet DivIcon object
//
// swagger:model visualicon
type DivIcon struct {
	Name string

	SVG string // the SVG description

	// swagger:ignore
	// access to the models instance that contains the original information
	VisualIconInterface VisualIconInterface `gorm:"-"`
}

type VisualIconInterface interface {
	GetIconName() (name string)
	GetSVG() (name string)
}

func (VisualIcon *DivIcon) UpdateVisualIcon() {
	if VisualIcon.VisualIconInterface != nil {
		VisualIcon.Name = VisualIcon.VisualIconInterface.GetIconName()
	}
}
