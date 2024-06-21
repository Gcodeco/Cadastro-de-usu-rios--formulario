document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.getElementById('productForm')
  const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0]
  const showFormButton = document.getElementById('showForm')

  const getProducts = () => {
    const products = localStorage.getItem('products')
    return products ? JSON.parse(products) : []
  }

  const saveProducts = products => {
    localStorage.setItem('products', JSON.stringify(products))
  }

  const updateProductTable = () => {
    const products = getProducts()
    productTable.innerHTML = ''

    // Ordenar produtos por valor
    products.sort((a, b) => a.price - b.price)

    products.forEach((product, index) => {
      const row = productTable.insertRow()
      row.insertCell(0).textContent = product.name
      row.insertCell(1).textContent = product.description
      row.insertCell(2).textContent = product.price.toFixed(2)

      const actionsCell = row.insertCell(3)
      const deleteButton = document.createElement('button')
      deleteButton.textContent = 'Excluir'
      deleteButton.addEventListener('click', () => deleteProduct(index))
      actionsCell.appendChild(deleteButton)
    })
  }

  const deleteProduct = index => {
    const products = getProducts()
    products.splice(index, 1) // Remove o produto pelo índice
    saveProducts(products)
    updateProductTable()
  }

  productForm.addEventListener('submit', event => {
    event.preventDefault()

    const name = document.getElementById('productName').value
    const description = document.getElementById('productDescription').value
    const price = parseFloat(document.getElementById('productPrice').value)
    const available = document.getElementById('productAvailable').value

    const newProduct = { name, description, price, available }

    const products = getProducts()
    products.push(newProduct)
    saveProducts(products)

    productForm.reset()
    updateProductTable()
  })

  showFormButton.addEventListener('click', () => {
    productForm.style.display = 'block'
    productForm.scrollIntoView()
  })

  updateProductTable()
})
