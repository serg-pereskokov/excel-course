import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
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