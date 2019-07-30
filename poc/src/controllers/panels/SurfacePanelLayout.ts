import { autorun, observable } from 'mobx';
import Layout from 'src/controllers/layout/Layout';
export default class SurfacePanelLayout extends Layout {
    // #region Properties (7)

    @observable public alignment: "left" | "right";
    @observable public key: string;
    public title: string;

    public name:string;

    // #endregion Properties (7)

    // #region Constructors (1)

    constructor(prevPanel: SurfacePanelLayout | null, title: string, alignment: "left" | "right", width: number, height: number) {
        super();
        this.key = title;
        this.title = title;
        this.alignment = alignment;
        this.width = width;
        this.height = height;

        if (prevPanel){

            autorun(()=>{
                this.x = prevPanel.outerRight;
            })
        }


        this.name = this.constructor.name;
    }

    // #endregion Constructors (1)
}
