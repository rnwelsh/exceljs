import BaseXform from "../base-xform.js"
import ColorXform from "./color-xform.js"
class StopXform extends BaseXform {
  constructor() {
    super()
    this.map = {
      color: new ColorXform(),
    }
  }
  get tag() {
    return 'stop'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN('stop')
    xmlStream.addA('position', model.position)
    this.map.color.render(xmlStream, model.color)
    xmlStream.cN()
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node)
      return true
    }
    switch (node.name) {
      case 'stop':
        this.model = {
          position: parseFloat(node.atts.position),
        }
        return true
      case 'color':
        this.parser = this.map.color
        this.parser.parseOpen(node)
        return true
      default:
        return false
    }
  }
  parseText() { }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model.color = this.parser.model
        this.parser = undefined
      }
      return true
    }
    return false
  }
}
class PatternFillXform extends BaseXform {
  constructor() {
    super()
    this.map = {
      fgColor: new ColorXform('fgColor'),
      bgColor: new ColorXform('bgColor'),
    }
  }
  get name() {
    return 'pattern'
  }
  get tag() {
    return 'patternFill'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN('patternFill')
    xmlStream.addA('patternType', model.pattern)
    if (model.fgColor) {
      this.map.fgColor.render(xmlStream, model.fgColor)
    }
    if (model.bgColor) {
      this.map.bgColor.render(xmlStream, model.bgColor)
    }
    xmlStream.cN()
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node)
      return true
    }
    switch (node.name) {
      case 'patternFill':
        this.model = {
          type: 'pattern',
          pattern: node.atts.patternType,
        }
        return true
      default:
        this.parser = this.map[node.name]
        if (this.parser) {
          this.parser.parseOpen(node)
          return true
        }
        return false
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text)
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        if (this.parser.model) {
          this.model[name] = this.parser.model
        }
        this.parser = undefined
      }
      return true
    }
    return false
  }
}
class GradientFillXform extends BaseXform {
  constructor() {
    super()
    this.map = {
      stop: new StopXform(),
    }
    // if (model) {
    //   this.gradient = model.gradient;
    //   if (model.center) {
    //     this.center = model.center;
    //   }
    //   if (model.degree !== undefined) {
    //     this.degree = model.degree;
    //   }
    //   this.stops = model.stops.map(function(stop) { return new StopXform(stop); });
    // } else {
    //   this.stops = [];
    // }
  }
  get name() {
    return 'gradient'
  }
  get tag() {
    return 'gradientFill'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN('gradientFill')
    switch (model.gradient) {
      case 'angle':
        xmlStream.addA('degree', model.degree)
        break
      case 'path':
        xmlStream.addA('type', 'path')
        if (model.center.left) {
          xmlStream.addA('left', model.center.left)
          if (model.center.right === undefined) {
            xmlStream.addA('right', model.center.left)
          }
        }
        if (model.center.right) {
          xmlStream.addA('right', model.center.right)
        }
        if (model.center.top) {
          xmlStream.addA('top', model.center.top)
          if (model.center.bottom === undefined) {
            xmlStream.addA('bottom', model.center.top)
          }
        }
        if (model.center.bottom) {
          xmlStream.addA('bottom', model.center.bottom)
        }
        break
      default:
        break
    }
    const stopXform = this.map.stop
    model.stops.forEach(stopModel => {
      stopXform.render(xmlStream, stopModel)
    })
    xmlStream.cN()
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node)
      return true
    }
    switch (node.name) {
      case 'gradientFill': {
        const model = (this.model = {
          stops: [],
        })
        if (node.atts.degree) {
          model.gradient = 'angle'
          model.degree = parseInt(node.atts.degree, 10)
        }
        else if (node.atts.type === 'path') {
          model.gradient = 'path'
          model.center = {
            left: node.atts.left ? parseFloat(node.atts.left) : 0,
            top: node.atts.top ? parseFloat(node.atts.top) : 0,
          }
          if (node.atts.right !== node.atts.left) {
            model.center.right = node.atts.right ? parseFloat(node.atts.right) : 0
          }
          if (node.atts.bottom !== node.atts.top) {
            model.center.bottom = node.atts.bottom ? parseFloat(node.atts.bottom) : 0
          }
        }
        return true
      }
      case 'stop':
        this.parser = this.map.stop
        this.parser.parseOpen(node)
        return true
      default:
        return false
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text)
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model.stops.push(this.parser.model)
        this.parser = undefined
      }
      return true
    }
    return false
  }
}
// Fill encapsulates translation from fill model to/from xlsx
class FillXform extends BaseXform {
  constructor() {
    super()
    this.map = {
      patternFill: new PatternFillXform(),
      gradientFill: new GradientFillXform(),
    }
  }
  get tag() {
    return 'fill'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.addRollback()
    xmlStream.oN('fill')
    switch (model.type) {
      case 'pattern':
        this.map.patternFill.render(xmlStream, model)
        break
      case 'gradient':
        this.map.gradientFill.render(xmlStream, model)
        break
      default:
        xmlStream.rollback()
        return
    }
    xmlStream.cN()
    xmlStream.commit()
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node)
      return true
    }
    switch (node.name) {
      case 'fill':
        this.model = {}
        return true
      default:
        this.parser = this.map[node.name]
        if (this.parser) {
          this.parser.parseOpen(node)
          return true
        }
        return false
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text)
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model = this.parser.model
        this.model.type = this.parser.name
        this.parser = undefined
      }
      return true
    }
    return false
  }
  validStyle(value) {
    return FillXform.validPatternValues[value]
  }
}
FillXform.validPatternValues = [
  'none',
  'solid',
  'darkVertical',
  'darkGray',
  'mediumGray',
  'lightGray',
  'gray125',
  'gray0625',
  'darkHorizontal',
  'darkVertical',
  'darkDown',
  'darkUp',
  'darkGrid',
  'darkTrellis',
  'lightHorizontal',
  'lightVertical',
  'lightDown',
  'lightUp',
  'lightGrid',
  'lightTrellis',
  'lightGrid',
].reduce((p, v) => {
  p[v] = true
  return p
}, {})
FillXform.StopXform = StopXform
FillXform.PatternFillXform = PatternFillXform
FillXform.GradientFillXform = GradientFillXform
export default FillXform
