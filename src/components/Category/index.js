import './index.css'

const Category = props => {
  const {each} = props
  const {name, imageUrl} = each
  return (
    <li>
      <div className="card-container">
        <img src={imageUrl} alt={name} className="card-img" />
        <p className="name">{name}</p>
      </div>
    </li>
  )
}

export default Category
