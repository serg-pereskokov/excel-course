import {$} from '@core/dom.js'
export const resizeHandler = (event, $root) => {
    const $resizer = $(event.target).css({opacity: 1})
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()

    const resizeType = event.target.dataset.resize

    // eslint-disable-next-line max-len
    const cells = $root.findAll([`[data-col="${$parent.data.col}"]`])

    let delta
    let value

    document.onmousemove = e => {
        if (resizeType == 'col') {
            delta = e.pageX - coords.right
            value = coords.width + delta
            $resizer.css({right: -delta + 'px', bottom: '-5000px'})
        } else {
            delta = e.pageY - coords.bottom
            value = coords.height + delta
            $resizer.css({bottom: -delta + 'px', right: '-5000px'})
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null


        if (resizeType == 'col') {
            $parent.css({width: value + 'px'})
            cells.forEach(el => el.style.width = value + 'px')
        } else {
            $parent.css({height: value + 'px'})
        }

        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        })
    }
}