let swapSound: HTMLAudioElement

const getSwapSound = () => {
  if (!swapSound) {
    swapSound = new Audio('swap.mp3')
  }
  return swapSound
}

export default getSwapSound