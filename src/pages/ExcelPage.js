import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {Store} from '@core/store/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {Page} from '@core/page';
import {normolizeInitialState} from '../redux/initialState'
import {StateProcessor} from '../core/page/StateProcessor'
import {LocalStorageClient} from '../core/page/LocalStorageClient'

function storageName(param) {
    return 'excel:'+param
}

export class ExcelPage extends Page {
    constructor(param) {
        super(param)

        this.storeSub = null
        this.processor = new StateProcessor(
            new LocalStorageClient(storageName(this.params))
        )
    }

    async getRoot() {
        const state = await this.processor.get()
        const store = new Store(rootReducer, normolizeInitialState(state))
        this.storeSub = store.subscribe(this.processor.listen(state))

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
        this.storeSub.unsubscribe()
    }
}