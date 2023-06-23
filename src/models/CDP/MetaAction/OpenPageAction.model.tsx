import MetaActionsEnum from './MetaAction.enum';
import MetaActionModel from './MetaAction.model';

export class OpenPageActionModel extends MetaActionModel {

    pageTitle: string;
    pageName: string;
    component: any;
    openData: any;
    props?: any;

    constructor(title: string, name: string, component: any, data: any, props?: any) {
        super();
        this.actionType = MetaActionsEnum.OpenPage;
        this.pageTitle = title;
        this.pageName = name;
        this.component = component;
        this.openData = data;
        this.props = props;
      }
}

export default OpenPageActionModel;