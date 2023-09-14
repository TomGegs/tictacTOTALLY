type Props = {
    player?: string;
    index: number;
    onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
};

function Square({ index, onClick, player }: Props) {
    const scale = player ? 'scale-100' : 'scale-0';
    const textColour = player === 'X' ? 'text-yellow-500' : 'text-pink-500';
    const hoverStyle =
        'transition duration ease-in-out hover:scale-105 transform';

    return (
        <div
            data-cell-index={index}
            className={`font-display h-fill flex cursor-pointer items-center justify-center bg-[#212121] text-center text-7xl ${hoverStyle}`}
            {...{ onClick }}
        >
            <span
                data-cell-index={index}
                className={`transform transition-all duration-150 ease-out ${scale} ${textColour}`}
            >
                {player}
            </span>
        </div>
    );
}

export default Square;
