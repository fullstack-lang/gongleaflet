// insertion point for imports

// usefull for managing pointer ID values that can be nullable
import { NullInt64 } from './front-repo.service'

export class VisualMapDB {
	CreatedAt?: string;
	DeletedAt?: string;
	ID?: number;

	// insertion point for basic fields declarations
	Lat?: number
	Lng?: number
	Name?: string
	ZoomLevel?: number
	UrlTemplate?: string
	Attribution?: string
	MaxZoom?: number
	ZoomControl?: string
	AttributionControl?: string
	ZoomSnap?: string

	// insertion point for other declarations
}
