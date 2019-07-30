import { action, observable } from 'mobx';

export class ScrollState  {
    // #region Properties (4)

    @observable public scrollHeight: number = 0;
    @observable public scrollLeft: number = 0;
    @observable public scrollTop: number = 0;
    @observable public scrollWidth: number = 0;

    // #endregion Properties (4)

    // #region Public Methods (1)

    @action public onScroll(event: React.UIEvent<HTMLDivElement>) {
        if (event.currentTarget) {
            const element = event.currentTarget;
            this.scrollLeft = element.scrollLeft;
            this.scrollTop = element.scrollTop;
            this.scrollWidth = element.scrollWidth;
            this.scrollHeight = element.scrollHeight;
        }

        event.stopPropagation();
    }

    // #endregion Public Methods (1)
}