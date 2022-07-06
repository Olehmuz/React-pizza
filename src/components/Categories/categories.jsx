import React from 'react'
const Categories = () => {
    const categoriesArray = ['Всі','М\'ясні','Вегітаріанські','Гриль','Гострі','Закриті']
    const [activeIndex, updateActiveIndex] = React.useState(0);
    return (
        <div className="categories">
            <ul>
                {categoriesArray.map((el,ind) => {
                    return <li key={ind} onClick={() => updateActiveIndex(ind)} className={ind === activeIndex ? 'active' : null}>{el}</li>
                })}
            </ul>
        </div>
    )
}
export default Categories;