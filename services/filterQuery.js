function filterQuery(filters, genre) {
  let str = ""
  if (filters.length != 0) str = ` AND c.categorie IN ${JSON.stringify(filters)}`.replace(/"/g, "'")
  if (genre == 'men' || genre == 'women') str += ` AND c.genre = "${genre}"`

  return str
}

module.exports = filterQuery