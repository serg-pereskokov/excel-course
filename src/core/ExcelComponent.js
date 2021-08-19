import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubscribes = []

        this.prepare()
    }

    // Settings component before init
    prepare() {}

    // Return tamplate of component
    toHTML() {
        return ''
    }

    // Event Emitting
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
    // subscribe on event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribes.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    // Only updates on text we subscr
    storeChanged() {}

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    // Init component
    // Add DOM listeners
    init() {
        this.initDOMListeners()
    }

    // Remove component
    // Clearing listeners
    destroy() {
        this.removeDOMListeners()
        this.unsubscribes.forEach(unsub => unsub())
    }
}