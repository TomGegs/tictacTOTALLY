type Props = {
    playerMove?: string;
    index: number;
    onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
};

function SmallCell({ index, onClick, playerMove }: Props) {
    const scale = playerMove ? 'scale-100' : 'scale-0';
    const textColour = playerMove === 'X' ? 'text-yellow-500' : 'text-pink-500';
    const hoverStyle =
        'transition duration ease-in-out hover:scale-105 hover:border-white hover:bg-[#464444] transform';

    return (
        <div
            small-data-cell-index={index}
            className={`font-display flex h-full cursor-pointer items-center justify-center border-2 border-[#212121] bg-[#212121] text-center text-3xl lg:text-[60px] ${hoverStyle}`}
            {...{ onClick }}
        >
            <span
                small-data-cell-index={index}
                className={`absolute h-fit transform transition-all duration-150 ease-out ${scale} ${textColour}`}
            >
                {playerMove}
            </span>
        </div>
    );
}

export default SmallCell;
