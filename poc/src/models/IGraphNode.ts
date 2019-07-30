import AttachedNodesLayout from "src/controllers/layout/AttachedNodesLayout";
import InputCostLayout from "src/controllers/layout/InputCostLayout";
import Layout from 'src/controllers/layout/Layout';
import PropertiesLayout from 'src/controllers/layout/PropertiesLayout';
import TextLayout from 'src/controllers/layout/TextLayout';

export default interface IGraphNode extends Layout{
    id: string;
    iconLayout: Layout;
    title: TextLayout;
    panelLayout: Layout;
    propertiesTitle: TextLayout;
    properties: PropertiesLayout;
    toggleProperties: () => void;
    propertiesExpanded: boolean;
    inputCostLayout: InputCostLayout;
    attachedNodesLayout: AttachedNodesLayout;

    children: IGraphNode[];

    rowIndex: number;
    columnIndex:number;
}
