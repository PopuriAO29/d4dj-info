import { Live2DModel } from 'pixi-live2d-display'
import * as PIXI from 'pixi.js'

export function dragable(model: any) {
  model.buttonMode = true
  model.on('pointerdown', (e: any) => {
    if (model.dragable) {
      model.dragging = true
      model._pointerX = e.data.global.x - model.x
      model._pointerY = e.data.global.y - model.y
    } else {
      model.internalModel.motionManager.startRandomMotion('')
    }
  })
  model.on('pointermove', (e: any) => {
    if (model.dragging) {
      model.position.x = e.data.global.x - model._pointerX
      model.position.y = e.data.global.y - model._pointerY
    }
  })
  model.on('pointerupoutside', () => (model.dragging = false))
  model.on('pointerup', () => (model.dragging = false))
}

export function addFrame(model: any) {
  const foreground = PIXI.Sprite.from(PIXI.Texture.WHITE)
  foreground.width = model.internalModel.width
  foreground.height = model.internalModel.height
  foreground.alpha = 0.2

  model.addChild(foreground)
  foreground.visible = true

  // checkbox("Model Frames", (checked) => (foreground.visible = checked));
}

export const getModelUrl = (model: string) =>
  `https://asset.d4dj.info/AssetBundles/Live2D/${model}/${model}.model3.json`

export const loadModel = async (modelFile: string) => {
  const model: any = await Live2DModel.from(getModelUrl(modelFile), {})
  model.x = 500
  model.y = 500
  model.rotation = Math.PI
  model.skew.x = Math.PI
  model.scale.set(0.4, 0.4)
  model.anchor.set(0.5, 0.5)
  return model
}
