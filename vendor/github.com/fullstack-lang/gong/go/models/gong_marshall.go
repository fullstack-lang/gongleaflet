// generated code - do not edit
package models

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
)

const marshallRes = `package {{PackageName}}

import (
	"time"

	"{{ModelsPackageName}}"

	// injection point for ident package import declaration{{ImportPackageDeclaration}}
)

// generated in order to avoid error in the package import
// if there are no elements in the stage to marshall
var ___dummy__Stage_{{databaseName}} models.StageStruct
var ___dummy__Time_{{databaseName}} time.Time

// Injection point for meta package dummy declaration{{ImportPackageDummyDeclaration}}

// currently, DocLink renaming is not enabled in gopls
// the following map are devised to overcome this limitation
// those maps and the processing code will be eleminated when
// DocLink renaming will be enabled in gopls
// [Corresponding Issue](https://github.com/golang/go/issues/57559)
//
// When parsed, those maps will help with the renaming process
var map_DocLink_Identifier_{{databaseName}} map[string]any = map[string]any{
	// injection point for docLink to identifiers{{EntriesDocLinkStringDocLinkIdentifier}}
}

// init might be handy if one want to have the data embedded in the binary
// but it has to properly reference the Injection gateway in the main package
// func init() {
// 	_ = __Dummy_time_variable
// 	InjectionGateway["{{databaseName}}"] = {{databaseName}}Injection
// }

// {{databaseName}}Injection will stage objects of database "{{databaseName}}"
func {{databaseName}}Injection(stage *models.StageStruct) {

	// Declaration of instances to stage{{Identifiers}}

	// Setup of values{{ValueInitializers}}

	// Setup of pointers{{PointersInitializers}}
}

`

const IdentifiersDecls = `
	{{Identifier}} := (&models.{{GeneratedStructName}}{Name: ` + "`" + `{{GeneratedFieldNameValue}}` + "`" + `}).Stage(stage)`

const StringInitStatement = `
	{{Identifier}}.{{GeneratedFieldName}} = ` + "`" + `{{GeneratedFieldNameValue}}` + "`"

const StringEnumInitStatement = `
	{{Identifier}}.{{GeneratedFieldName}} = {{GeneratedFieldNameValue}}`

const NumberInitStatement = `
	{{Identifier}}.{{GeneratedFieldName}} = {{GeneratedFieldNameValue}}`

const PointerFieldInitStatement = `
	{{Identifier}}.{{GeneratedFieldName}} = {{GeneratedFieldNameValue}}`

const SliceOfPointersFieldInitStatement = `
	{{Identifier}}.{{GeneratedFieldName}} = append({{Identifier}}.{{GeneratedFieldName}}, {{GeneratedFieldNameValue}})`

const TimeInitStatement = `
	{{Identifier}}.{{GeneratedFieldName}}, _ = time.Parse("2006-01-02 15:04:05.999999999 -0700 MST", "{{GeneratedFieldNameValue}}")`

// Marshall marshall the stage content into the file as an instanciation into a stage
func (stage *StageStruct) Marshall(file *os.File, modelsPackageName, packageName string) {

	name := file.Name()

	if !strings.HasSuffix(name, ".go") {
		log.Fatalln(name + " is not a go filename")
	}

	log.Println("filename of marshall output is " + name)
	newBase := filepath.Base(file.Name())

	res := marshallRes
	res = strings.ReplaceAll(res, "{{databaseName}}", strings.ReplaceAll(newBase, ".go", ""))
	res = strings.ReplaceAll(res, "{{PackageName}}", packageName)
	res = strings.ReplaceAll(res, "{{ModelsPackageName}}", modelsPackageName)

	// map of identifiers
	// var StageMapDstructIds map[*Dstruct]string
	identifiersDecl := ""
	initializerStatements := ""
	pointersInitializesStatements := ""

	id := ""
	_ = id
	decl := ""
	_ = decl
	setValueField := ""
	_ = setValueField 

	// insertion initialization of objects to stage
	map_GongBasicField_Identifiers := make(map[*GongBasicField]string)
	_ = map_GongBasicField_Identifiers

	gongbasicfieldOrdered := []*GongBasicField{}
	for gongbasicfield := range stage.GongBasicFields {
		gongbasicfieldOrdered = append(gongbasicfieldOrdered, gongbasicfield)
	}
	sort.Slice(gongbasicfieldOrdered[:], func(i, j int) bool {
		return gongbasicfieldOrdered[i].Name < gongbasicfieldOrdered[j].Name
	})
	identifiersDecl += "\n\n	// Declarations of staged instances of GongBasicField"
	for idx, gongbasicfield := range gongbasicfieldOrdered {

		id = generatesIdentifier("GongBasicField", idx, gongbasicfield.Name)
		map_GongBasicField_Identifiers[gongbasicfield] = id

		decl = IdentifiersDecls
		decl = strings.ReplaceAll(decl, "{{Identifier}}", id)
		decl = strings.ReplaceAll(decl, "{{GeneratedStructName}}", "GongBasicField")
		decl = strings.ReplaceAll(decl, "{{GeneratedFieldNameValue}}", gongbasicfield.Name)
		identifiersDecl += decl

		initializerStatements += "\n\n	// GongBasicField values setup"
		// Initialisation of values
		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Name")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gongbasicfield.Name))
		initializerStatements += setValueField

		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "BasicKindName")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gongbasicfield.BasicKindName))
		initializerStatements += setValueField

		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "DeclaredType")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gongbasicfield.DeclaredType))
		initializerStatements += setValueField

		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "CompositeStructName")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gongbasicfield.CompositeStructName))
		initializerStatements += setValueField

		setValueField = NumberInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Index")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", fmt.Sprintf("%d", gongbasicfield.Index))
		initializerStatements += setValueField

		setValueField = NumberInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "IsDocLink")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", fmt.Sprintf("%t", gongbasicfield.IsDocLink))
		initializerStatements += setValueField

		setValueField = NumberInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "IsTextArea")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", fmt.Sprintf("%t", gongbasicfield.IsTextArea))
		initializerStatements += setValueField

	}

	map_GongEnum_Identifiers := make(map[*GongEnum]string)
	_ = map_GongEnum_Identifiers

	gongenumOrdered := []*GongEnum{}
	for gongenum := range stage.GongEnums {
		gongenumOrdered = append(gongenumOrdered, gongenum)
	}
	sort.Slice(gongenumOrdered[:], func(i, j int) bool {
		return gongenumOrdered[i].Name < gongenumOrdered[j].Name
	})
	identifiersDecl += "\n\n	// Declarations of staged instances of GongEnum"
	for idx, gongenum := range gongenumOrdered {

		id = generatesIdentifier("GongEnum", idx, gongenum.Name)
		map_GongEnum_Identifiers[gongenum] = id

		decl = IdentifiersDecls
		decl = strings.ReplaceAll(decl, "{{Identifier}}", id)
		decl = strings.ReplaceAll(decl, "{{GeneratedStructName}}", "GongEnum")
		decl = strings.ReplaceAll(decl, "{{GeneratedFieldNameValue}}", gongenum.Name)
		identifiersDecl += decl

		initializerStatements += "\n\n	// GongEnum values setup"
		// Initialisation of values
		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Name")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gongenum.Name))
		initializerStatements += setValueField

		setValueField = NumberInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Type")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", "models."+gongenum.Type.ToCodeString())
		initializerStatements += setValueField

	}

	map_GongEnumValue_Identifiers := make(map[*GongEnumValue]string)
	_ = map_GongEnumValue_Identifiers

	gongenumvalueOrdered := []*GongEnumValue{}
	for gongenumvalue := range stage.GongEnumValues {
		gongenumvalueOrdered = append(gongenumvalueOrdered, gongenumvalue)
	}
	sort.Slice(gongenumvalueOrdered[:], func(i, j int) bool {
		return gongenumvalueOrdered[i].Name < gongenumvalueOrdered[j].Name
	})
	identifiersDecl += "\n\n	// Declarations of staged instances of GongEnumValue"
	for idx, gongenumvalue := range gongenumvalueOrdered {

		id = generatesIdentifier("GongEnumValue", idx, gongenumvalue.Name)
		map_GongEnumValue_Identifiers[gongenumvalue] = id

		decl = IdentifiersDecls
		decl = strings.ReplaceAll(decl, "{{Identifier}}", id)
		decl = strings.ReplaceAll(decl, "{{GeneratedStructName}}", "GongEnumValue")
		decl = strings.ReplaceAll(decl, "{{GeneratedFieldNameValue}}", gongenumvalue.Name)
		identifiersDecl += decl

		initializerStatements += "\n\n	// GongEnumValue values setup"
		// Initialisation of values
		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Name")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gongenumvalue.Name))
		initializerStatements += setValueField

		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Value")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gongenumvalue.Value))
		initializerStatements += setValueField

	}

	map_GongLink_Identifiers := make(map[*GongLink]string)
	_ = map_GongLink_Identifiers

	gonglinkOrdered := []*GongLink{}
	for gonglink := range stage.GongLinks {
		gonglinkOrdered = append(gonglinkOrdered, gonglink)
	}
	sort.Slice(gonglinkOrdered[:], func(i, j int) bool {
		return gonglinkOrdered[i].Name < gonglinkOrdered[j].Name
	})
	identifiersDecl += "\n\n	// Declarations of staged instances of GongLink"
	for idx, gonglink := range gonglinkOrdered {

		id = generatesIdentifier("GongLink", idx, gonglink.Name)
		map_GongLink_Identifiers[gonglink] = id

		decl = IdentifiersDecls
		decl = strings.ReplaceAll(decl, "{{Identifier}}", id)
		decl = strings.ReplaceAll(decl, "{{GeneratedStructName}}", "GongLink")
		decl = strings.ReplaceAll(decl, "{{GeneratedFieldNameValue}}", gonglink.Name)
		identifiersDecl += decl

		initializerStatements += "\n\n	// GongLink values setup"
		// Initialisation of values
		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Name")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gonglink.Name))
		initializerStatements += setValueField

		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Recv")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gonglink.Recv))
		initializerStatements += setValueField

		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "ImportPath")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gonglink.ImportPath))
		initializerStatements += setValueField

	}

	map_GongNote_Identifiers := make(map[*GongNote]string)
	_ = map_GongNote_Identifiers

	gongnoteOrdered := []*GongNote{}
	for gongnote := range stage.GongNotes {
		gongnoteOrdered = append(gongnoteOrdered, gongnote)
	}
	sort.Slice(gongnoteOrdered[:], func(i, j int) bool {
		return gongnoteOrdered[i].Name < gongnoteOrdered[j].Name
	})
	identifiersDecl += "\n\n	// Declarations of staged instances of GongNote"
	for idx, gongnote := range gongnoteOrdered {

		id = generatesIdentifier("GongNote", idx, gongnote.Name)
		map_GongNote_Identifiers[gongnote] = id

		decl = IdentifiersDecls
		decl = strings.ReplaceAll(decl, "{{Identifier}}", id)
		decl = strings.ReplaceAll(decl, "{{GeneratedStructName}}", "GongNote")
		decl = strings.ReplaceAll(decl, "{{GeneratedFieldNameValue}}", gongnote.Name)
		identifiersDecl += decl

		initializerStatements += "\n\n	// GongNote values setup"
		// Initialisation of values
		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Name")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gongnote.Name))
		initializerStatements += setValueField

		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Body")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gongnote.Body))
		initializerStatements += setValueField

		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "BodyHTML")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gongnote.BodyHTML))
		initializerStatements += setValueField

	}

	map_GongStruct_Identifiers := make(map[*GongStruct]string)
	_ = map_GongStruct_Identifiers

	gongstructOrdered := []*GongStruct{}
	for gongstruct := range stage.GongStructs {
		gongstructOrdered = append(gongstructOrdered, gongstruct)
	}
	sort.Slice(gongstructOrdered[:], func(i, j int) bool {
		return gongstructOrdered[i].Name < gongstructOrdered[j].Name
	})
	identifiersDecl += "\n\n	// Declarations of staged instances of GongStruct"
	for idx, gongstruct := range gongstructOrdered {

		id = generatesIdentifier("GongStruct", idx, gongstruct.Name)
		map_GongStruct_Identifiers[gongstruct] = id

		decl = IdentifiersDecls
		decl = strings.ReplaceAll(decl, "{{Identifier}}", id)
		decl = strings.ReplaceAll(decl, "{{GeneratedStructName}}", "GongStruct")
		decl = strings.ReplaceAll(decl, "{{GeneratedFieldNameValue}}", gongstruct.Name)
		identifiersDecl += decl

		initializerStatements += "\n\n	// GongStruct values setup"
		// Initialisation of values
		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Name")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gongstruct.Name))
		initializerStatements += setValueField

		setValueField = NumberInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "HasOnAfterUpdateSignature")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", fmt.Sprintf("%t", gongstruct.HasOnAfterUpdateSignature))
		initializerStatements += setValueField

		setValueField = NumberInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "IsIgnoredForFront")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", fmt.Sprintf("%t", gongstruct.IsIgnoredForFront))
		initializerStatements += setValueField

	}

	map_GongTimeField_Identifiers := make(map[*GongTimeField]string)
	_ = map_GongTimeField_Identifiers

	gongtimefieldOrdered := []*GongTimeField{}
	for gongtimefield := range stage.GongTimeFields {
		gongtimefieldOrdered = append(gongtimefieldOrdered, gongtimefield)
	}
	sort.Slice(gongtimefieldOrdered[:], func(i, j int) bool {
		return gongtimefieldOrdered[i].Name < gongtimefieldOrdered[j].Name
	})
	identifiersDecl += "\n\n	// Declarations of staged instances of GongTimeField"
	for idx, gongtimefield := range gongtimefieldOrdered {

		id = generatesIdentifier("GongTimeField", idx, gongtimefield.Name)
		map_GongTimeField_Identifiers[gongtimefield] = id

		decl = IdentifiersDecls
		decl = strings.ReplaceAll(decl, "{{Identifier}}", id)
		decl = strings.ReplaceAll(decl, "{{GeneratedStructName}}", "GongTimeField")
		decl = strings.ReplaceAll(decl, "{{GeneratedFieldNameValue}}", gongtimefield.Name)
		identifiersDecl += decl

		initializerStatements += "\n\n	// GongTimeField values setup"
		// Initialisation of values
		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Name")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gongtimefield.Name))
		initializerStatements += setValueField

		setValueField = NumberInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Index")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", fmt.Sprintf("%d", gongtimefield.Index))
		initializerStatements += setValueField

		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "CompositeStructName")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(gongtimefield.CompositeStructName))
		initializerStatements += setValueField

	}

	map_Meta_Identifiers := make(map[*Meta]string)
	_ = map_Meta_Identifiers

	metaOrdered := []*Meta{}
	for meta := range stage.Metas {
		metaOrdered = append(metaOrdered, meta)
	}
	sort.Slice(metaOrdered[:], func(i, j int) bool {
		return metaOrdered[i].Name < metaOrdered[j].Name
	})
	identifiersDecl += "\n\n	// Declarations of staged instances of Meta"
	for idx, meta := range metaOrdered {

		id = generatesIdentifier("Meta", idx, meta.Name)
		map_Meta_Identifiers[meta] = id

		decl = IdentifiersDecls
		decl = strings.ReplaceAll(decl, "{{Identifier}}", id)
		decl = strings.ReplaceAll(decl, "{{GeneratedStructName}}", "Meta")
		decl = strings.ReplaceAll(decl, "{{GeneratedFieldNameValue}}", meta.Name)
		identifiersDecl += decl

		initializerStatements += "\n\n	// Meta values setup"
		// Initialisation of values
		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Name")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(meta.Name))
		initializerStatements += setValueField

		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Text")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(meta.Text))
		initializerStatements += setValueField

	}

	map_MetaReference_Identifiers := make(map[*MetaReference]string)
	_ = map_MetaReference_Identifiers

	metareferenceOrdered := []*MetaReference{}
	for metareference := range stage.MetaReferences {
		metareferenceOrdered = append(metareferenceOrdered, metareference)
	}
	sort.Slice(metareferenceOrdered[:], func(i, j int) bool {
		return metareferenceOrdered[i].Name < metareferenceOrdered[j].Name
	})
	identifiersDecl += "\n\n	// Declarations of staged instances of MetaReference"
	for idx, metareference := range metareferenceOrdered {

		id = generatesIdentifier("MetaReference", idx, metareference.Name)
		map_MetaReference_Identifiers[metareference] = id

		decl = IdentifiersDecls
		decl = strings.ReplaceAll(decl, "{{Identifier}}", id)
		decl = strings.ReplaceAll(decl, "{{GeneratedStructName}}", "MetaReference")
		decl = strings.ReplaceAll(decl, "{{GeneratedFieldNameValue}}", metareference.Name)
		identifiersDecl += decl

		initializerStatements += "\n\n	// MetaReference values setup"
		// Initialisation of values
		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Name")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(metareference.Name))
		initializerStatements += setValueField

	}

	map_ModelPkg_Identifiers := make(map[*ModelPkg]string)
	_ = map_ModelPkg_Identifiers

	modelpkgOrdered := []*ModelPkg{}
	for modelpkg := range stage.ModelPkgs {
		modelpkgOrdered = append(modelpkgOrdered, modelpkg)
	}
	sort.Slice(modelpkgOrdered[:], func(i, j int) bool {
		return modelpkgOrdered[i].Name < modelpkgOrdered[j].Name
	})
	identifiersDecl += "\n\n	// Declarations of staged instances of ModelPkg"
	for idx, modelpkg := range modelpkgOrdered {

		id = generatesIdentifier("ModelPkg", idx, modelpkg.Name)
		map_ModelPkg_Identifiers[modelpkg] = id

		decl = IdentifiersDecls
		decl = strings.ReplaceAll(decl, "{{Identifier}}", id)
		decl = strings.ReplaceAll(decl, "{{GeneratedStructName}}", "ModelPkg")
		decl = strings.ReplaceAll(decl, "{{GeneratedFieldNameValue}}", modelpkg.Name)
		identifiersDecl += decl

		initializerStatements += "\n\n	// ModelPkg values setup"
		// Initialisation of values
		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Name")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(modelpkg.Name))
		initializerStatements += setValueField

		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "PkgPath")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(modelpkg.PkgPath))
		initializerStatements += setValueField

	}

	map_PointerToGongStructField_Identifiers := make(map[*PointerToGongStructField]string)
	_ = map_PointerToGongStructField_Identifiers

	pointertogongstructfieldOrdered := []*PointerToGongStructField{}
	for pointertogongstructfield := range stage.PointerToGongStructFields {
		pointertogongstructfieldOrdered = append(pointertogongstructfieldOrdered, pointertogongstructfield)
	}
	sort.Slice(pointertogongstructfieldOrdered[:], func(i, j int) bool {
		return pointertogongstructfieldOrdered[i].Name < pointertogongstructfieldOrdered[j].Name
	})
	identifiersDecl += "\n\n	// Declarations of staged instances of PointerToGongStructField"
	for idx, pointertogongstructfield := range pointertogongstructfieldOrdered {

		id = generatesIdentifier("PointerToGongStructField", idx, pointertogongstructfield.Name)
		map_PointerToGongStructField_Identifiers[pointertogongstructfield] = id

		decl = IdentifiersDecls
		decl = strings.ReplaceAll(decl, "{{Identifier}}", id)
		decl = strings.ReplaceAll(decl, "{{GeneratedStructName}}", "PointerToGongStructField")
		decl = strings.ReplaceAll(decl, "{{GeneratedFieldNameValue}}", pointertogongstructfield.Name)
		identifiersDecl += decl

		initializerStatements += "\n\n	// PointerToGongStructField values setup"
		// Initialisation of values
		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Name")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(pointertogongstructfield.Name))
		initializerStatements += setValueField

		setValueField = NumberInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Index")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", fmt.Sprintf("%d", pointertogongstructfield.Index))
		initializerStatements += setValueField

		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "CompositeStructName")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(pointertogongstructfield.CompositeStructName))
		initializerStatements += setValueField

	}

	map_SliceOfPointerToGongStructField_Identifiers := make(map[*SliceOfPointerToGongStructField]string)
	_ = map_SliceOfPointerToGongStructField_Identifiers

	sliceofpointertogongstructfieldOrdered := []*SliceOfPointerToGongStructField{}
	for sliceofpointertogongstructfield := range stage.SliceOfPointerToGongStructFields {
		sliceofpointertogongstructfieldOrdered = append(sliceofpointertogongstructfieldOrdered, sliceofpointertogongstructfield)
	}
	sort.Slice(sliceofpointertogongstructfieldOrdered[:], func(i, j int) bool {
		return sliceofpointertogongstructfieldOrdered[i].Name < sliceofpointertogongstructfieldOrdered[j].Name
	})
	identifiersDecl += "\n\n	// Declarations of staged instances of SliceOfPointerToGongStructField"
	for idx, sliceofpointertogongstructfield := range sliceofpointertogongstructfieldOrdered {

		id = generatesIdentifier("SliceOfPointerToGongStructField", idx, sliceofpointertogongstructfield.Name)
		map_SliceOfPointerToGongStructField_Identifiers[sliceofpointertogongstructfield] = id

		decl = IdentifiersDecls
		decl = strings.ReplaceAll(decl, "{{Identifier}}", id)
		decl = strings.ReplaceAll(decl, "{{GeneratedStructName}}", "SliceOfPointerToGongStructField")
		decl = strings.ReplaceAll(decl, "{{GeneratedFieldNameValue}}", sliceofpointertogongstructfield.Name)
		identifiersDecl += decl

		initializerStatements += "\n\n	// SliceOfPointerToGongStructField values setup"
		// Initialisation of values
		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Name")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(sliceofpointertogongstructfield.Name))
		initializerStatements += setValueField

		setValueField = NumberInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "Index")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", fmt.Sprintf("%d", sliceofpointertogongstructfield.Index))
		initializerStatements += setValueField

		setValueField = StringInitStatement
		setValueField = strings.ReplaceAll(setValueField, "{{Identifier}}", id)
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldName}}", "CompositeStructName")
		setValueField = strings.ReplaceAll(setValueField, "{{GeneratedFieldNameValue}}", string(sliceofpointertogongstructfield.CompositeStructName))
		initializerStatements += setValueField

	}

	// insertion initialization of objects to stage
	for idx, gongbasicfield := range gongbasicfieldOrdered {
		var setPointerField string
		_ = setPointerField

		id = generatesIdentifier("GongBasicField", idx, gongbasicfield.Name)
		map_GongBasicField_Identifiers[gongbasicfield] = id

		// Initialisation of values
		if gongbasicfield.GongEnum != nil {
			setPointerField = PointerFieldInitStatement
			setPointerField = strings.ReplaceAll(setPointerField, "{{Identifier}}", id)
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldName}}", "GongEnum")
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldNameValue}}", map_GongEnum_Identifiers[gongbasicfield.GongEnum])
			pointersInitializesStatements += setPointerField
		}

	}

	for idx, gongenum := range gongenumOrdered {
		var setPointerField string
		_ = setPointerField

		id = generatesIdentifier("GongEnum", idx, gongenum.Name)
		map_GongEnum_Identifiers[gongenum] = id

		// Initialisation of values
		for _, _gongenumvalue := range gongenum.GongEnumValues {
			setPointerField = SliceOfPointersFieldInitStatement
			setPointerField = strings.ReplaceAll(setPointerField, "{{Identifier}}", id)
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldName}}", "GongEnumValues")
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldNameValue}}", map_GongEnumValue_Identifiers[_gongenumvalue])
			pointersInitializesStatements += setPointerField
		}

	}

	for idx, gongenumvalue := range gongenumvalueOrdered {
		var setPointerField string
		_ = setPointerField

		id = generatesIdentifier("GongEnumValue", idx, gongenumvalue.Name)
		map_GongEnumValue_Identifiers[gongenumvalue] = id

		// Initialisation of values
	}

	for idx, gonglink := range gonglinkOrdered {
		var setPointerField string
		_ = setPointerField

		id = generatesIdentifier("GongLink", idx, gonglink.Name)
		map_GongLink_Identifiers[gonglink] = id

		// Initialisation of values
	}

	for idx, gongnote := range gongnoteOrdered {
		var setPointerField string
		_ = setPointerField

		id = generatesIdentifier("GongNote", idx, gongnote.Name)
		map_GongNote_Identifiers[gongnote] = id

		// Initialisation of values
		for _, _gonglink := range gongnote.Links {
			setPointerField = SliceOfPointersFieldInitStatement
			setPointerField = strings.ReplaceAll(setPointerField, "{{Identifier}}", id)
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldName}}", "Links")
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldNameValue}}", map_GongLink_Identifiers[_gonglink])
			pointersInitializesStatements += setPointerField
		}

	}

	for idx, gongstruct := range gongstructOrdered {
		var setPointerField string
		_ = setPointerField

		id = generatesIdentifier("GongStruct", idx, gongstruct.Name)
		map_GongStruct_Identifiers[gongstruct] = id

		// Initialisation of values
		for _, _gongbasicfield := range gongstruct.GongBasicFields {
			setPointerField = SliceOfPointersFieldInitStatement
			setPointerField = strings.ReplaceAll(setPointerField, "{{Identifier}}", id)
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldName}}", "GongBasicFields")
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldNameValue}}", map_GongBasicField_Identifiers[_gongbasicfield])
			pointersInitializesStatements += setPointerField
		}

		for _, _gongtimefield := range gongstruct.GongTimeFields {
			setPointerField = SliceOfPointersFieldInitStatement
			setPointerField = strings.ReplaceAll(setPointerField, "{{Identifier}}", id)
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldName}}", "GongTimeFields")
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldNameValue}}", map_GongTimeField_Identifiers[_gongtimefield])
			pointersInitializesStatements += setPointerField
		}

		for _, _pointertogongstructfield := range gongstruct.PointerToGongStructFields {
			setPointerField = SliceOfPointersFieldInitStatement
			setPointerField = strings.ReplaceAll(setPointerField, "{{Identifier}}", id)
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldName}}", "PointerToGongStructFields")
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldNameValue}}", map_PointerToGongStructField_Identifiers[_pointertogongstructfield])
			pointersInitializesStatements += setPointerField
		}

		for _, _sliceofpointertogongstructfield := range gongstruct.SliceOfPointerToGongStructFields {
			setPointerField = SliceOfPointersFieldInitStatement
			setPointerField = strings.ReplaceAll(setPointerField, "{{Identifier}}", id)
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldName}}", "SliceOfPointerToGongStructFields")
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldNameValue}}", map_SliceOfPointerToGongStructField_Identifiers[_sliceofpointertogongstructfield])
			pointersInitializesStatements += setPointerField
		}

	}

	for idx, gongtimefield := range gongtimefieldOrdered {
		var setPointerField string
		_ = setPointerField

		id = generatesIdentifier("GongTimeField", idx, gongtimefield.Name)
		map_GongTimeField_Identifiers[gongtimefield] = id

		// Initialisation of values
	}

	for idx, meta := range metaOrdered {
		var setPointerField string
		_ = setPointerField

		id = generatesIdentifier("Meta", idx, meta.Name)
		map_Meta_Identifiers[meta] = id

		// Initialisation of values
		for _, _metareference := range meta.MetaReferences {
			setPointerField = SliceOfPointersFieldInitStatement
			setPointerField = strings.ReplaceAll(setPointerField, "{{Identifier}}", id)
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldName}}", "MetaReferences")
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldNameValue}}", map_MetaReference_Identifiers[_metareference])
			pointersInitializesStatements += setPointerField
		}

	}

	for idx, metareference := range metareferenceOrdered {
		var setPointerField string
		_ = setPointerField

		id = generatesIdentifier("MetaReference", idx, metareference.Name)
		map_MetaReference_Identifiers[metareference] = id

		// Initialisation of values
	}

	for idx, modelpkg := range modelpkgOrdered {
		var setPointerField string
		_ = setPointerField

		id = generatesIdentifier("ModelPkg", idx, modelpkg.Name)
		map_ModelPkg_Identifiers[modelpkg] = id

		// Initialisation of values
	}

	for idx, pointertogongstructfield := range pointertogongstructfieldOrdered {
		var setPointerField string
		_ = setPointerField

		id = generatesIdentifier("PointerToGongStructField", idx, pointertogongstructfield.Name)
		map_PointerToGongStructField_Identifiers[pointertogongstructfield] = id

		// Initialisation of values
		if pointertogongstructfield.GongStruct != nil {
			setPointerField = PointerFieldInitStatement
			setPointerField = strings.ReplaceAll(setPointerField, "{{Identifier}}", id)
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldName}}", "GongStruct")
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldNameValue}}", map_GongStruct_Identifiers[pointertogongstructfield.GongStruct])
			pointersInitializesStatements += setPointerField
		}

	}

	for idx, sliceofpointertogongstructfield := range sliceofpointertogongstructfieldOrdered {
		var setPointerField string
		_ = setPointerField

		id = generatesIdentifier("SliceOfPointerToGongStructField", idx, sliceofpointertogongstructfield.Name)
		map_SliceOfPointerToGongStructField_Identifiers[sliceofpointertogongstructfield] = id

		// Initialisation of values
		if sliceofpointertogongstructfield.GongStruct != nil {
			setPointerField = PointerFieldInitStatement
			setPointerField = strings.ReplaceAll(setPointerField, "{{Identifier}}", id)
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldName}}", "GongStruct")
			setPointerField = strings.ReplaceAll(setPointerField, "{{GeneratedFieldNameValue}}", map_GongStruct_Identifiers[sliceofpointertogongstructfield.GongStruct])
			pointersInitializesStatements += setPointerField
		}

	}

	res = strings.ReplaceAll(res, "{{Identifiers}}", identifiersDecl)
	res = strings.ReplaceAll(res, "{{ValueInitializers}}", initializerStatements)
	res = strings.ReplaceAll(res, "{{PointersInitializers}}", pointersInitializesStatements)

	if stage.MetaPackageImportAlias != "" {
		res = strings.ReplaceAll(res, "{{ImportPackageDeclaration}}",
			fmt.Sprintf("\n\t%s %s", stage.MetaPackageImportAlias, stage.MetaPackageImportPath))

		res = strings.ReplaceAll(res, "{{ImportPackageDummyDeclaration}}",
			fmt.Sprintf("\nvar ___dummy__%s_%s %s.StageStruct",
				stage.MetaPackageImportAlias,
				strings.ReplaceAll(filepath.Base(name), ".go", ""),
				stage.MetaPackageImportAlias))

		var entries string

		// regenerate the map of doc link renaming
		// the key and value are set to the value because
		// if it has been renamed, this is the new value that matters
		valuesOrdered := make([]GONG__Identifier, 0)
		for _, value := range stage.Map_DocLink_Renaming {
			valuesOrdered = append(valuesOrdered, value)
		}
		sort.Slice(valuesOrdered[:], func(i, j int) bool {
			return valuesOrdered[i].Ident < valuesOrdered[j].Ident
		})
		for _, value := range valuesOrdered {

			// get the number of points in the value to find if it is a field
			// or a struct

			switch value.Type {
			case GONG__ENUM_CAST_INT:
				entries += fmt.Sprintf("\n\n\t\"%s\": %s(0),", value.Ident, value.Ident)
			case GONG__ENUM_CAST_STRING:
				entries += fmt.Sprintf("\n\n\t\"%s\": %s(\"\"),", value.Ident, value.Ident)
			case GONG__FIELD_VALUE:
				// substitute the second point with "{})."
				joker := "__substitute_for_first_point__"
				valueIdentifier := strings.Replace(value.Ident, ".", joker, 1)
				valueIdentifier = strings.Replace(valueIdentifier, ".", "{}).", 1)
				valueIdentifier = strings.Replace(valueIdentifier, joker, ".", 1)
				entries += fmt.Sprintf("\n\n\t\"%s\": (%s,", value.Ident, valueIdentifier)
			case GONG__IDENTIFIER_CONST:
				entries += fmt.Sprintf("\n\n\t\"%s\": %s,", value.Ident, value.Ident)
			case GONG__STRUCT_INSTANCE:
				entries += fmt.Sprintf("\n\n\t\"%s\": &(%s{}),", value.Ident, value.Ident)
			}
		}

		res = strings.ReplaceAll(res, "{{EntriesDocLinkStringDocLinkIdentifier}}", entries)
	}

	fmt.Fprintln(file, res)
}

// unique identifier per struct
func generatesIdentifier(gongStructName string, idx int, instanceName string) (identifier string) {

	identifier = instanceName
	// Make a Regex to say we only want letters and numbers
	reg, err := regexp.Compile("[^a-zA-Z0-9]+")
	if err != nil {
		log.Fatal(err)
	}
	processedString := reg.ReplaceAllString(instanceName, "_")

	identifier = fmt.Sprintf("__%s__%06d_%s", gongStructName, idx, processedString)

	return
}