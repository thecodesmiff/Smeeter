/* eslint-disable no-undef */
import GifPick from "gif-picker-react";

// eslint-disable-next-line react/prop-types
const gifPicker = ({ setGifs }) => {
  return (
    <div>
        <GifPick tenorApiKey={import.meta.env.VITE_TENOR_KEY} onGifClick={(TenorImage) => setGifs(TenorImage.url)} />
    </div>
  )
}

export default gifPicker