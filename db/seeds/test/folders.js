
exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => knex('folders').del())
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        folder_name: "really cool folder"
      }, 'id')
      .then(folder => {
        console.log('folder', folder)

        return knex('urls').insert([
          {
            url_name: ' testing wbesites',
            long_url: 'http://coolwebsite.com',
            folder_id: folder[0],
            visit_count: 2
          },
          {
            url_name: 'another test website',
            long_url: 'http://nickelbackforlife.com',
            folder_id: folder[0],
            visit_count: 1
          }
        ])
      })
    ])
  })
}

