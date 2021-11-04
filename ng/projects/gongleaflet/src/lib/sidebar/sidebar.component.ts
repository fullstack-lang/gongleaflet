import { Component, OnInit } from '@angular/core';
import { Router, RouterState } from '@angular/router';

import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

import { FrontRepoService, FrontRepo } from '../front-repo.service'
import { CommitNbService } from '../commitnb.service'

// insertion point for per struct import code
import { DivIconService } from '../divicon.service'
import { getDivIconUniqueID } from '../front-repo.service'
import { LayerGroupService } from '../layergroup.service'
import { getLayerGroupUniqueID } from '../front-repo.service'
import { LayerGroupUseService } from '../layergroupuse.service'
import { getLayerGroupUseUniqueID } from '../front-repo.service'
import { MapOptionsService } from '../mapoptions.service'
import { getMapOptionsUniqueID } from '../front-repo.service'
import { MarkerService } from '../marker.service'
import { getMarkerUniqueID } from '../front-repo.service'
import { VisualCircleService } from '../visualcircle.service'
import { getVisualCircleUniqueID } from '../front-repo.service'
import { VisualLineService } from '../visualline.service'
import { getVisualLineUniqueID } from '../front-repo.service'
import { VisualTrackService } from '../visualtrack.service'
import { getVisualTrackUniqueID } from '../front-repo.service'

/**
 * Types of a GongNode / GongFlatNode
 */
export enum GongNodeType {
  STRUCT = "STRUCT",
  INSTANCE = "INSTANCE",
  ONE__ZERO_ONE_ASSOCIATION = 'ONE__ZERO_ONE_ASSOCIATION',
  ONE__ZERO_MANY_ASSOCIATION = 'ONE__ZERO_MANY_ASSOCIATION',
}

/**
 * GongNode is the "data" node
 */
interface GongNode {
  name: string; // if STRUCT, the name of the struct, if INSTANCE the name of the instance
  children: GongNode[];
  type: GongNodeType;
  structName: string;
  associationField: string;
  associatedStructName: string;
  id: number;
  uniqueIdPerStack: number;
}


/** 
 * GongFlatNode is the dynamic visual node with expandable and level information
 * */
interface GongFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  type: GongNodeType;
  structName: string;
  associationField: string;
  associatedStructName: string;
  id: number;
  uniqueIdPerStack: number;
}


@Component({
  selector: 'app-gongleaflet-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  /**
  * _transformer generated a displayed node from a data node
  *
  * @param node input data noe
  * @param level input level
  *
  * @returns an ExampleFlatNode
  */
  private _transformer = (node: GongNode, level: number) => {
    return {

      /**
      * in javascript, The !! ensures the resulting type is a boolean (true or false).
      *
      * !!node.children will evaluate to true is the variable is defined
      */
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      type: node.type,
      structName: node.structName,
      associationField: node.associationField,
      associatedStructName: node.associatedStructName,
      id: node.id,
      uniqueIdPerStack: node.uniqueIdPerStack,
    }
  }

  /**
   * treeControl is passed as the paramter treeControl in the "mat-tree" selector
   *
   * Flat tree control. Able to expand/collapse a subtree recursively for flattened tree.
   *
   * Construct with flat tree data node functions getLevel and isExpandable.
  constructor(
    getLevel: (dataNode: T) => number,
    isExpandable: (dataNode: T) => boolean, 
    options?: FlatTreeControlOptions<T, K> | undefined);
   */
  treeControl = new FlatTreeControl<GongFlatNode>(
    node => node.level,
    node => node.expandable
  );

  /**
   * from mat-tree documentation
   *
   * Tree flattener to convert a normal type of node to node with children & level information.
   */
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  /**
   * data is the other paramter to the "mat-tree" selector
   * 
   * strangely, the dataSource declaration has to follow the treeFlattener declaration
   */
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  /**
   * hasChild is used by the selector for expandable nodes
   * 
   *  <mat-tree-node *matTreeNodeDef="let node;when: hasChild" matTreeNodePadding>
   * 
   * @param _ 
   * @param node 
   */
  hasChild = (_: number, node: GongFlatNode) => node.expandable;

  // front repo
  frontRepo: FrontRepo = new (FrontRepo)
  commitNb: number = 0

  // "data" tree that is constructed during NgInit and is passed to the mat-tree component
  gongNodeTree = new Array<GongNode>();

  constructor(
    private router: Router,
    private frontRepoService: FrontRepoService,
    private commitNbService: CommitNbService,

    // insertion point for per struct service declaration
    private diviconService: DivIconService,
    private layergroupService: LayerGroupService,
    private layergroupuseService: LayerGroupUseService,
    private mapoptionsService: MapOptionsService,
    private markerService: MarkerService,
    private visualcircleService: VisualCircleService,
    private visuallineService: VisualLineService,
    private visualtrackService: VisualTrackService,
  ) { }

  ngOnInit(): void {
    this.refresh()

    // insertion point for per struct observable for refresh trigger
    // observable for changes in structs
    this.diviconService.DivIconServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          this.refresh()
        }
      }
    )
    // observable for changes in structs
    this.layergroupService.LayerGroupServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          this.refresh()
        }
      }
    )
    // observable for changes in structs
    this.layergroupuseService.LayerGroupUseServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          this.refresh()
        }
      }
    )
    // observable for changes in structs
    this.mapoptionsService.MapOptionsServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          this.refresh()
        }
      }
    )
    // observable for changes in structs
    this.markerService.MarkerServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          this.refresh()
        }
      }
    )
    // observable for changes in structs
    this.visualcircleService.VisualCircleServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          this.refresh()
        }
      }
    )
    // observable for changes in structs
    this.visuallineService.VisualLineServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          this.refresh()
        }
      }
    )
    // observable for changes in structs
    this.visualtrackService.VisualTrackServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          this.refresh()
        }
      }
    )
  }

  refresh(): void {
    this.frontRepoService.pull().subscribe(frontRepo => {
      this.frontRepo = frontRepo

      // use of a Gödel number to uniquely identfy nodes : 2 * node.id + 3 * node.level
      let memoryOfExpandedNodes = new Map<number, boolean>()
      let nonInstanceNodeId = 1

      this.treeControl.dataNodes?.forEach(
        node => {
          if (this.treeControl.isExpanded(node)) {
            memoryOfExpandedNodes.set(node.uniqueIdPerStack, true)
          } else {
            memoryOfExpandedNodes.set(node.uniqueIdPerStack, false)
          }
        }
      )

      // reset the gong node tree
      this.gongNodeTree = new Array<GongNode>();
      
      // insertion point for per struct tree construction
      /**
      * fill up the DivIcon part of the mat tree
      */
      let diviconGongNodeStruct: GongNode = {
        name: "DivIcon",
        type: GongNodeType.STRUCT,
        id: 0,
        uniqueIdPerStack: 13 * nonInstanceNodeId,
        structName: "DivIcon",
        associationField: "",
        associatedStructName: "",
        children: new Array<GongNode>()
      }
      nonInstanceNodeId = nonInstanceNodeId + 1
      this.gongNodeTree.push(diviconGongNodeStruct)

      this.frontRepo.DivIcons_array.sort((t1, t2) => {
        if (t1.Name > t2.Name) {
          return 1;
        }
        if (t1.Name < t2.Name) {
          return -1;
        }
        return 0;
      });

      this.frontRepo.DivIcons_array.forEach(
        diviconDB => {
          let diviconGongNodeInstance: GongNode = {
            name: diviconDB.Name,
            type: GongNodeType.INSTANCE,
            id: diviconDB.ID,
            uniqueIdPerStack: getDivIconUniqueID(diviconDB.ID),
            structName: "DivIcon",
            associationField: "",
            associatedStructName: "",
            children: new Array<GongNode>()
          }
          diviconGongNodeStruct.children!.push(diviconGongNodeInstance)

          // insertion point for per field code
        }
      )

      /**
      * fill up the LayerGroup part of the mat tree
      */
      let layergroupGongNodeStruct: GongNode = {
        name: "LayerGroup",
        type: GongNodeType.STRUCT,
        id: 0,
        uniqueIdPerStack: 13 * nonInstanceNodeId,
        structName: "LayerGroup",
        associationField: "",
        associatedStructName: "",
        children: new Array<GongNode>()
      }
      nonInstanceNodeId = nonInstanceNodeId + 1
      this.gongNodeTree.push(layergroupGongNodeStruct)

      this.frontRepo.LayerGroups_array.sort((t1, t2) => {
        if (t1.Name > t2.Name) {
          return 1;
        }
        if (t1.Name < t2.Name) {
          return -1;
        }
        return 0;
      });

      this.frontRepo.LayerGroups_array.forEach(
        layergroupDB => {
          let layergroupGongNodeInstance: GongNode = {
            name: layergroupDB.Name,
            type: GongNodeType.INSTANCE,
            id: layergroupDB.ID,
            uniqueIdPerStack: getLayerGroupUniqueID(layergroupDB.ID),
            structName: "LayerGroup",
            associationField: "",
            associatedStructName: "",
            children: new Array<GongNode>()
          }
          layergroupGongNodeStruct.children!.push(layergroupGongNodeInstance)

          // insertion point for per field code
        }
      )

      /**
      * fill up the LayerGroupUse part of the mat tree
      */
      let layergroupuseGongNodeStruct: GongNode = {
        name: "LayerGroupUse",
        type: GongNodeType.STRUCT,
        id: 0,
        uniqueIdPerStack: 13 * nonInstanceNodeId,
        structName: "LayerGroupUse",
        associationField: "",
        associatedStructName: "",
        children: new Array<GongNode>()
      }
      nonInstanceNodeId = nonInstanceNodeId + 1
      this.gongNodeTree.push(layergroupuseGongNodeStruct)

      this.frontRepo.LayerGroupUses_array.sort((t1, t2) => {
        if (t1.Name > t2.Name) {
          return 1;
        }
        if (t1.Name < t2.Name) {
          return -1;
        }
        return 0;
      });

      this.frontRepo.LayerGroupUses_array.forEach(
        layergroupuseDB => {
          let layergroupuseGongNodeInstance: GongNode = {
            name: layergroupuseDB.Name,
            type: GongNodeType.INSTANCE,
            id: layergroupuseDB.ID,
            uniqueIdPerStack: getLayerGroupUseUniqueID(layergroupuseDB.ID),
            structName: "LayerGroupUse",
            associationField: "",
            associatedStructName: "",
            children: new Array<GongNode>()
          }
          layergroupuseGongNodeStruct.children!.push(layergroupuseGongNodeInstance)

          // insertion point for per field code
          /**
          * let append a node for the association LayerGroup
          */
          let LayerGroupGongNodeAssociation: GongNode = {
            name: "(LayerGroup) LayerGroup",
            type: GongNodeType.ONE__ZERO_ONE_ASSOCIATION,
            id: layergroupuseDB.ID,
            uniqueIdPerStack: 17 * nonInstanceNodeId,
            structName: "LayerGroupUse",
            associationField: "LayerGroup",
            associatedStructName: "LayerGroup",
            children: new Array<GongNode>()
          }
          nonInstanceNodeId = nonInstanceNodeId + 1
          layergroupuseGongNodeInstance.children!.push(LayerGroupGongNodeAssociation)

          /**
            * let append a node for the instance behind the asssociation LayerGroup
            */
          if (layergroupuseDB.LayerGroup != undefined) {
            let layergroupuseGongNodeInstance_LayerGroup: GongNode = {
              name: layergroupuseDB.LayerGroup.Name,
              type: GongNodeType.INSTANCE,
              id: layergroupuseDB.LayerGroup.ID,
              uniqueIdPerStack: // godel numbering (thank you kurt)
                3 * getLayerGroupUseUniqueID(layergroupuseDB.ID)
                + 5 * getLayerGroupUniqueID(layergroupuseDB.LayerGroup.ID),
              structName: "LayerGroup",
              associationField: "",
              associatedStructName: "",
              children: new Array<GongNode>()
            }
            LayerGroupGongNodeAssociation.children.push(layergroupuseGongNodeInstance_LayerGroup)
          }

        }
      )

      /**
      * fill up the MapOptions part of the mat tree
      */
      let mapoptionsGongNodeStruct: GongNode = {
        name: "MapOptions",
        type: GongNodeType.STRUCT,
        id: 0,
        uniqueIdPerStack: 13 * nonInstanceNodeId,
        structName: "MapOptions",
        associationField: "",
        associatedStructName: "",
        children: new Array<GongNode>()
      }
      nonInstanceNodeId = nonInstanceNodeId + 1
      this.gongNodeTree.push(mapoptionsGongNodeStruct)

      this.frontRepo.MapOptionss_array.sort((t1, t2) => {
        if (t1.Name > t2.Name) {
          return 1;
        }
        if (t1.Name < t2.Name) {
          return -1;
        }
        return 0;
      });

      this.frontRepo.MapOptionss_array.forEach(
        mapoptionsDB => {
          let mapoptionsGongNodeInstance: GongNode = {
            name: mapoptionsDB.Name,
            type: GongNodeType.INSTANCE,
            id: mapoptionsDB.ID,
            uniqueIdPerStack: getMapOptionsUniqueID(mapoptionsDB.ID),
            structName: "MapOptions",
            associationField: "",
            associatedStructName: "",
            children: new Array<GongNode>()
          }
          mapoptionsGongNodeStruct.children!.push(mapoptionsGongNodeInstance)

          // insertion point for per field code
        }
      )

      /**
      * fill up the Marker part of the mat tree
      */
      let markerGongNodeStruct: GongNode = {
        name: "Marker",
        type: GongNodeType.STRUCT,
        id: 0,
        uniqueIdPerStack: 13 * nonInstanceNodeId,
        structName: "Marker",
        associationField: "",
        associatedStructName: "",
        children: new Array<GongNode>()
      }
      nonInstanceNodeId = nonInstanceNodeId + 1
      this.gongNodeTree.push(markerGongNodeStruct)

      this.frontRepo.Markers_array.sort((t1, t2) => {
        if (t1.Name > t2.Name) {
          return 1;
        }
        if (t1.Name < t2.Name) {
          return -1;
        }
        return 0;
      });

      this.frontRepo.Markers_array.forEach(
        markerDB => {
          let markerGongNodeInstance: GongNode = {
            name: markerDB.Name,
            type: GongNodeType.INSTANCE,
            id: markerDB.ID,
            uniqueIdPerStack: getMarkerUniqueID(markerDB.ID),
            structName: "Marker",
            associationField: "",
            associatedStructName: "",
            children: new Array<GongNode>()
          }
          markerGongNodeStruct.children!.push(markerGongNodeInstance)

          // insertion point for per field code
          /**
          * let append a node for the association LayerGroup
          */
          let LayerGroupGongNodeAssociation: GongNode = {
            name: "(LayerGroup) LayerGroup",
            type: GongNodeType.ONE__ZERO_ONE_ASSOCIATION,
            id: markerDB.ID,
            uniqueIdPerStack: 17 * nonInstanceNodeId,
            structName: "Marker",
            associationField: "LayerGroup",
            associatedStructName: "LayerGroup",
            children: new Array<GongNode>()
          }
          nonInstanceNodeId = nonInstanceNodeId + 1
          markerGongNodeInstance.children!.push(LayerGroupGongNodeAssociation)

          /**
            * let append a node for the instance behind the asssociation LayerGroup
            */
          if (markerDB.LayerGroup != undefined) {
            let markerGongNodeInstance_LayerGroup: GongNode = {
              name: markerDB.LayerGroup.Name,
              type: GongNodeType.INSTANCE,
              id: markerDB.LayerGroup.ID,
              uniqueIdPerStack: // godel numbering (thank you kurt)
                3 * getMarkerUniqueID(markerDB.ID)
                + 5 * getLayerGroupUniqueID(markerDB.LayerGroup.ID),
              structName: "LayerGroup",
              associationField: "",
              associatedStructName: "",
              children: new Array<GongNode>()
            }
            LayerGroupGongNodeAssociation.children.push(markerGongNodeInstance_LayerGroup)
          }

          /**
          * let append a node for the association DivIcon
          */
          let DivIconGongNodeAssociation: GongNode = {
            name: "(DivIcon) DivIcon",
            type: GongNodeType.ONE__ZERO_ONE_ASSOCIATION,
            id: markerDB.ID,
            uniqueIdPerStack: 17 * nonInstanceNodeId,
            structName: "Marker",
            associationField: "DivIcon",
            associatedStructName: "DivIcon",
            children: new Array<GongNode>()
          }
          nonInstanceNodeId = nonInstanceNodeId + 1
          markerGongNodeInstance.children!.push(DivIconGongNodeAssociation)

          /**
            * let append a node for the instance behind the asssociation DivIcon
            */
          if (markerDB.DivIcon != undefined) {
            let markerGongNodeInstance_DivIcon: GongNode = {
              name: markerDB.DivIcon.Name,
              type: GongNodeType.INSTANCE,
              id: markerDB.DivIcon.ID,
              uniqueIdPerStack: // godel numbering (thank you kurt)
                3 * getMarkerUniqueID(markerDB.ID)
                + 5 * getDivIconUniqueID(markerDB.DivIcon.ID),
              structName: "DivIcon",
              associationField: "",
              associatedStructName: "",
              children: new Array<GongNode>()
            }
            DivIconGongNodeAssociation.children.push(markerGongNodeInstance_DivIcon)
          }

        }
      )

      /**
      * fill up the VisualCircle part of the mat tree
      */
      let visualcircleGongNodeStruct: GongNode = {
        name: "VisualCircle",
        type: GongNodeType.STRUCT,
        id: 0,
        uniqueIdPerStack: 13 * nonInstanceNodeId,
        structName: "VisualCircle",
        associationField: "",
        associatedStructName: "",
        children: new Array<GongNode>()
      }
      nonInstanceNodeId = nonInstanceNodeId + 1
      this.gongNodeTree.push(visualcircleGongNodeStruct)

      this.frontRepo.VisualCircles_array.sort((t1, t2) => {
        if (t1.Name > t2.Name) {
          return 1;
        }
        if (t1.Name < t2.Name) {
          return -1;
        }
        return 0;
      });

      this.frontRepo.VisualCircles_array.forEach(
        visualcircleDB => {
          let visualcircleGongNodeInstance: GongNode = {
            name: visualcircleDB.Name,
            type: GongNodeType.INSTANCE,
            id: visualcircleDB.ID,
            uniqueIdPerStack: getVisualCircleUniqueID(visualcircleDB.ID),
            structName: "VisualCircle",
            associationField: "",
            associatedStructName: "",
            children: new Array<GongNode>()
          }
          visualcircleGongNodeStruct.children!.push(visualcircleGongNodeInstance)

          // insertion point for per field code
          /**
          * let append a node for the association LayerGroup
          */
          let LayerGroupGongNodeAssociation: GongNode = {
            name: "(LayerGroup) LayerGroup",
            type: GongNodeType.ONE__ZERO_ONE_ASSOCIATION,
            id: visualcircleDB.ID,
            uniqueIdPerStack: 17 * nonInstanceNodeId,
            structName: "VisualCircle",
            associationField: "LayerGroup",
            associatedStructName: "LayerGroup",
            children: new Array<GongNode>()
          }
          nonInstanceNodeId = nonInstanceNodeId + 1
          visualcircleGongNodeInstance.children!.push(LayerGroupGongNodeAssociation)

          /**
            * let append a node for the instance behind the asssociation LayerGroup
            */
          if (visualcircleDB.LayerGroup != undefined) {
            let visualcircleGongNodeInstance_LayerGroup: GongNode = {
              name: visualcircleDB.LayerGroup.Name,
              type: GongNodeType.INSTANCE,
              id: visualcircleDB.LayerGroup.ID,
              uniqueIdPerStack: // godel numbering (thank you kurt)
                3 * getVisualCircleUniqueID(visualcircleDB.ID)
                + 5 * getLayerGroupUniqueID(visualcircleDB.LayerGroup.ID),
              structName: "LayerGroup",
              associationField: "",
              associatedStructName: "",
              children: new Array<GongNode>()
            }
            LayerGroupGongNodeAssociation.children.push(visualcircleGongNodeInstance_LayerGroup)
          }

        }
      )

      /**
      * fill up the VisualLine part of the mat tree
      */
      let visuallineGongNodeStruct: GongNode = {
        name: "VisualLine",
        type: GongNodeType.STRUCT,
        id: 0,
        uniqueIdPerStack: 13 * nonInstanceNodeId,
        structName: "VisualLine",
        associationField: "",
        associatedStructName: "",
        children: new Array<GongNode>()
      }
      nonInstanceNodeId = nonInstanceNodeId + 1
      this.gongNodeTree.push(visuallineGongNodeStruct)

      this.frontRepo.VisualLines_array.sort((t1, t2) => {
        if (t1.Name > t2.Name) {
          return 1;
        }
        if (t1.Name < t2.Name) {
          return -1;
        }
        return 0;
      });

      this.frontRepo.VisualLines_array.forEach(
        visuallineDB => {
          let visuallineGongNodeInstance: GongNode = {
            name: visuallineDB.Name,
            type: GongNodeType.INSTANCE,
            id: visuallineDB.ID,
            uniqueIdPerStack: getVisualLineUniqueID(visuallineDB.ID),
            structName: "VisualLine",
            associationField: "",
            associatedStructName: "",
            children: new Array<GongNode>()
          }
          visuallineGongNodeStruct.children!.push(visuallineGongNodeInstance)

          // insertion point for per field code
          /**
          * let append a node for the association LayerGroup
          */
          let LayerGroupGongNodeAssociation: GongNode = {
            name: "(LayerGroup) LayerGroup",
            type: GongNodeType.ONE__ZERO_ONE_ASSOCIATION,
            id: visuallineDB.ID,
            uniqueIdPerStack: 17 * nonInstanceNodeId,
            structName: "VisualLine",
            associationField: "LayerGroup",
            associatedStructName: "LayerGroup",
            children: new Array<GongNode>()
          }
          nonInstanceNodeId = nonInstanceNodeId + 1
          visuallineGongNodeInstance.children!.push(LayerGroupGongNodeAssociation)

          /**
            * let append a node for the instance behind the asssociation LayerGroup
            */
          if (visuallineDB.LayerGroup != undefined) {
            let visuallineGongNodeInstance_LayerGroup: GongNode = {
              name: visuallineDB.LayerGroup.Name,
              type: GongNodeType.INSTANCE,
              id: visuallineDB.LayerGroup.ID,
              uniqueIdPerStack: // godel numbering (thank you kurt)
                3 * getVisualLineUniqueID(visuallineDB.ID)
                + 5 * getLayerGroupUniqueID(visuallineDB.LayerGroup.ID),
              structName: "LayerGroup",
              associationField: "",
              associatedStructName: "",
              children: new Array<GongNode>()
            }
            LayerGroupGongNodeAssociation.children.push(visuallineGongNodeInstance_LayerGroup)
          }

        }
      )

      /**
      * fill up the VisualTrack part of the mat tree
      */
      let visualtrackGongNodeStruct: GongNode = {
        name: "VisualTrack",
        type: GongNodeType.STRUCT,
        id: 0,
        uniqueIdPerStack: 13 * nonInstanceNodeId,
        structName: "VisualTrack",
        associationField: "",
        associatedStructName: "",
        children: new Array<GongNode>()
      }
      nonInstanceNodeId = nonInstanceNodeId + 1
      this.gongNodeTree.push(visualtrackGongNodeStruct)

      this.frontRepo.VisualTracks_array.sort((t1, t2) => {
        if (t1.Name > t2.Name) {
          return 1;
        }
        if (t1.Name < t2.Name) {
          return -1;
        }
        return 0;
      });

      this.frontRepo.VisualTracks_array.forEach(
        visualtrackDB => {
          let visualtrackGongNodeInstance: GongNode = {
            name: visualtrackDB.Name,
            type: GongNodeType.INSTANCE,
            id: visualtrackDB.ID,
            uniqueIdPerStack: getVisualTrackUniqueID(visualtrackDB.ID),
            structName: "VisualTrack",
            associationField: "",
            associatedStructName: "",
            children: new Array<GongNode>()
          }
          visualtrackGongNodeStruct.children!.push(visualtrackGongNodeInstance)

          // insertion point for per field code
          /**
          * let append a node for the association LayerGroup
          */
          let LayerGroupGongNodeAssociation: GongNode = {
            name: "(LayerGroup) LayerGroup",
            type: GongNodeType.ONE__ZERO_ONE_ASSOCIATION,
            id: visualtrackDB.ID,
            uniqueIdPerStack: 17 * nonInstanceNodeId,
            structName: "VisualTrack",
            associationField: "LayerGroup",
            associatedStructName: "LayerGroup",
            children: new Array<GongNode>()
          }
          nonInstanceNodeId = nonInstanceNodeId + 1
          visualtrackGongNodeInstance.children!.push(LayerGroupGongNodeAssociation)

          /**
            * let append a node for the instance behind the asssociation LayerGroup
            */
          if (visualtrackDB.LayerGroup != undefined) {
            let visualtrackGongNodeInstance_LayerGroup: GongNode = {
              name: visualtrackDB.LayerGroup.Name,
              type: GongNodeType.INSTANCE,
              id: visualtrackDB.LayerGroup.ID,
              uniqueIdPerStack: // godel numbering (thank you kurt)
                3 * getVisualTrackUniqueID(visualtrackDB.ID)
                + 5 * getLayerGroupUniqueID(visualtrackDB.LayerGroup.ID),
              structName: "LayerGroup",
              associationField: "",
              associatedStructName: "",
              children: new Array<GongNode>()
            }
            LayerGroupGongNodeAssociation.children.push(visualtrackGongNodeInstance_LayerGroup)
          }

          /**
          * let append a node for the association DivIcon
          */
          let DivIconGongNodeAssociation: GongNode = {
            name: "(DivIcon) DivIcon",
            type: GongNodeType.ONE__ZERO_ONE_ASSOCIATION,
            id: visualtrackDB.ID,
            uniqueIdPerStack: 17 * nonInstanceNodeId,
            structName: "VisualTrack",
            associationField: "DivIcon",
            associatedStructName: "DivIcon",
            children: new Array<GongNode>()
          }
          nonInstanceNodeId = nonInstanceNodeId + 1
          visualtrackGongNodeInstance.children!.push(DivIconGongNodeAssociation)

          /**
            * let append a node for the instance behind the asssociation DivIcon
            */
          if (visualtrackDB.DivIcon != undefined) {
            let visualtrackGongNodeInstance_DivIcon: GongNode = {
              name: visualtrackDB.DivIcon.Name,
              type: GongNodeType.INSTANCE,
              id: visualtrackDB.DivIcon.ID,
              uniqueIdPerStack: // godel numbering (thank you kurt)
                3 * getVisualTrackUniqueID(visualtrackDB.ID)
                + 5 * getDivIconUniqueID(visualtrackDB.DivIcon.ID),
              structName: "DivIcon",
              associationField: "",
              associatedStructName: "",
              children: new Array<GongNode>()
            }
            DivIconGongNodeAssociation.children.push(visualtrackGongNodeInstance_DivIcon)
          }

        }
      )


      this.dataSource.data = this.gongNodeTree

      // expand nodes that were exapanded before
      this.treeControl.dataNodes?.forEach(
        node => {
          if (memoryOfExpandedNodes.get(node.uniqueIdPerStack)) {
            this.treeControl.expand(node)
          }
        }
      )
    });

    // fetch the number of commits
    this.commitNbService.getCommitNb().subscribe(
      commitNb => {
        this.commitNb = commitNb
      }
    )
  }

  /**
   * 
   * @param path for the outlet selection
   */
  setTableRouterOutlet(path: string) {
    this.router.navigate([{
      outlets: {
        github_com_fullstack_lang_gongleaflet_go_table: ["github_com_fullstack_lang_gongleaflet_go-" + path]
      }
    }]);
  }

  /**
   * 
   * @param path for the outlet selection
   */
  setTableRouterOutletFromTree(path: string, type: GongNodeType, structName: string, id: number) {

    if (type == GongNodeType.STRUCT) {
      this.router.navigate([{
        outlets: {
          github_com_fullstack_lang_gongleaflet_go_table: ["github_com_fullstack_lang_gongleaflet_go-" + path.toLowerCase()]
        }
      }]);
    }

    if (type == GongNodeType.INSTANCE) {
      this.router.navigate([{
        outlets: {
          github_com_fullstack_lang_gongleaflet_go_presentation: ["github_com_fullstack_lang_gongleaflet_go-" + structName.toLowerCase() + "-presentation", id]
        }
      }]);
    }
  }

  setEditorRouterOutlet(path: string) {
    this.router.navigate([{
      outlets: {
        github_com_fullstack_lang_gongleaflet_go_editor: ["github_com_fullstack_lang_gongleaflet_go-" + path.toLowerCase()]
      }
    }]);
  }

  setEditorSpecialRouterOutlet(node: GongFlatNode) {
    this.router.navigate([{
      outlets: {
        github_com_fullstack_lang_gongleaflet_go_editor: ["github_com_fullstack_lang_gongleaflet_go-" + node.associatedStructName.toLowerCase() + "-adder", node.id, node.structName, node.associationField]
      }
    }]);
  }
}
