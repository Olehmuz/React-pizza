import React from 'react'
type CategoriesProps = {
    value: number;
    updateValue: (id: number) => void;
}
const Categories:React.FC<CategoriesProps> = ({value, updateValue}) => {
    const categoriesArray = ['Всі','М\'ясні','Вегітаріанські','Гриль','Гострі','Закриті']
    
    return (
        <div className="categories">
            <ul>
                {categoriesArray.map((el,ind) => {
                    return <li key={ind} onClick={() => updateValue(ind)} className={ind === value ? 'active' : ''}>{el}</li>
                })}
            </ul>
        </div>
    )
}
export default Categories;