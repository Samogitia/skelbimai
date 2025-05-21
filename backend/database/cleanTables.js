import {
      usersTableModel,
      commentsTableModel,
      advertsTableModel,
      categoriesTableModel,
      photosTableModel,
      favoritesTableModel,
      commentsTableConstraints,
      advertsTableConstraints,
      favoritesTableConstraints,
      photosTableConstraints,
      deleteAllTables

} from '../models/databaseModels.js'


async function cleanTables() {
      try {
            await deleteAllTables()
            await usersTableModel()
            await commentsTableModel()
            await advertsTableModel()
            await categoriesTableModel()
            await photosTableModel()
            await favoritesTableModel()
            await commentsTableModel()
            await commentsTableConstraints()
            await advertsTableConstraints()
            await favoritesTableConstraints()
            await photosTableConstraints()
      }
      catch ( error ) {
            console.log(error)
            process.exit(1)
      }
}

export default cleanTables