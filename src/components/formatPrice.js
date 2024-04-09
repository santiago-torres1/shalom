const formatPrice = (price) => {
    return price.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0 
      });
}

export default formatPrice