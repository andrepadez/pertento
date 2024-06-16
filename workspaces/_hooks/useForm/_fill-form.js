const dateFormat = v => v.toISOString().slice(0, 10)

const fillForm = function (theForm, state, path = [], done = []) {
  if (!state) return
  Object.entries(state).forEach(([key, val]) => {
    let target
    const targets = Array.from(document.querySelectorAll(`[name=${key}]`))
    if (targets.length === 1) {
      target = targets[0]
    } else {
      if (targets.every(t => t.type === 'radio')) {
        target = theForm[key]
      } else {
        if (path.length === 0) {
          target = theForm.querySelector(`[name=${key}]`)
        }
        let fieldset = theForm
        for (let i = 0; i < path.length; i++) {
          fieldset = fieldset.querySelector(`fieldset[name=${path[i]}]`)
        }
        if (fieldset) {
          target = fieldset.querySelector(`[name=${key}]`)
        }
      }
    }

    if (target && val === null) {
      if (['text', 'number'].includes(target.type)) {
        target.value = ''
      }
    }

    if (typeof val === 'boolean') {
      if (target) {
        target.checked = val
      }
    }

    if (val && val.constructor === Date) {
      target.value = dateFormat(val)
    }

    if (typeof val !== 'object') {
      if (target) {
        target.value = val.toString()
      }
      return
    }

    if (Array.isArray(val)) {
      if (target && target[0] && target[0].type === 'checkbox') {
        ;[...target].forEach(elem => {
          elem.checked = val.includes(elem.value)
        })
      } else if (target && target.nodeName === 'SELECT') {
        const options = [...target.options]
        options.forEach(option => {
          option.selected = val.includes(option.value)
        })
      }
      return
    }

    fillForm(theForm, state[key], [...path, key])
  })
}

export default fillForm
