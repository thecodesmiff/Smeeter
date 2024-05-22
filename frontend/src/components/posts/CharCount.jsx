

const CharCount = ({ smeetText }) => {


    let progressValue = (smeetText.length / 240) * 100;
    let charsLeft = 240 - smeetText.length;
    let countColor = '';


    switch(true) {
        case charsLeft === 0:
            countColor = 'red'
            break;
        case charsLeft <= 20:
            countColor = 'yellow'
            break;
        default: 
            countColor = '#1D99EC'
    }


  return (
    <div>
        <div className="w-[22px] h-[22px] rounded-2xl grid place-items-center before:content-[''] before:absolute before:h-[18px] before:w-[18px] before:bg-black before:rounded-xl"  style={{
                    background: `conic-gradient(${countColor} ${progressValue * 3.6}deg,
                        #333333 ${progressValue * 3.6}deg`
                }}>
            <div>
                <div className="relative text-xs text-white p-[3px] rounded[10px]">{charsLeft <= 20 ? charsLeft: "" }</div>
            </div>
        </div>
    </div>
  )
}

export default CharCount