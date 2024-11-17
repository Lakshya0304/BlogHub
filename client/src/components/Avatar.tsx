interface avatarProps {
    name : string ,
    size: 'small' | 'medium' | 'large'
}

const sizeClasses = {
    small: 'w-7 h-7 text-lg',   
    medium: 'w-12 h-12 text-xl',  
    large: 'w-16 h-16 text-2xl',  
};

export function Avatar({name , size} :avatarProps) {
    return (
    <div 
        className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-600 rounded-full ${sizeClasses[size]}`}
        aria-label={`Avatar for ${name}`}>
            <span className="font-medium text-m text-gray-300 ">
                {name[0].toUpperCase() }
            </span>
    </div>
    )
}