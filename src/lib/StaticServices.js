function getContainer() {
  if (!global.storyline) {
    global.storyline = {
      services: {},
    }
  }

  return global.storyline.services
}

export default {
  get(name, createFunc) {
    const container = getContainer()

    if (!container[name]) {
      container[name] = createFunc()
    }

    return container[name]
  },
}
