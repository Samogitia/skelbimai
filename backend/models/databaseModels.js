import { pool } from '../database/database.js'

async function usersTableModel() {
      const query = `CREATE TABLE IF NOT EXISTS users (
                        id                SERIAL PRIMARY KEY,
                        name              TEXT NOT NULL,
                        last_name         TEXT NOT NULL,
                        email             VARCHAR (50) NOT NULL UNIQUE,
                        status            TEXT NOT NULL,
                        password_h        TEXT NOT NULL,
                        created_at        TIMESTAMP NOT NULL DEFAULT NOW(),
                        deleted_at        TIMESTAMP
                        );`
      
      try {
            await pool.query(query)
            console.log('\x1b[33m users\x1b[0m \x1b[32m table created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31m Failed to create users table\x1b[0m', error)
      }
}

async function commentsTableModel() {
      const query = `CREATE TABLE IF NOT EXISTS comments (
                        id                SERIAL PRIMARY KEY,
                        advert_id         INT NOT NULL UNIQUE,
                        user_id           INT NOT NULL UNIQUE,
                        comment           TEXT NOT NULL,
                        created_at        TIMESTAMP NOT NULL DEFAULT NOW(),
                        deleted_at        TIMESTAMP
                        );`

      try {
            await pool.query(query)
            console.log('\x1b[33m comments\x1b[0m \x1b[32m table created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31m Failed to create comments table\x1b[0m', error)
      }
}

async function advertsTableModel() {
      const query = `CREATE TABLE IF NOT EXISTS adverts (
                        id                SERIAL PRIMARY KEY,
                        name              TEXT NOT NULL,
                        description       TEXT NOT NULL,
                        category_id       INT NOT NULL,
                        price             INT NOT NULL,
                        user_id           INT NOT NULL,
                        created_at        TIMESTAMP NOT NULL DEFAULT NOW(),
                        deleted_at        TIMESTAMP
                        );`

      try {
            await pool.query(query)
            console.log('\x1b[33m adverts\x1b[0m \x1b[32m table created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31m Failed to create adverts table\x1b[0m', error)
      }
}

async function categoriesTableModel() {
      const query = `CREATE TABLE IF NOT EXISTS categories (
                        id                SERIAL PRIMARY KEY,
                        name              TEXT NOT NULL UNIQUE
                        );`

      try {
            await pool.query(query)
            console.log('\x1b[33m categories\x1b[0m \x1b[32m table created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31m Failed to create categories table\x1b[0m', error)
      }
}

async function photosTableModel() {
      const query = `CREATE TABLE IF NOT EXISTS photos (
                        id                SERIAL PRIMARY KEY,
                        photo_url         TEXT NOT NULL,
                        advert_id         INT NOT NULL
                        );`

      try {
            await pool.query(query)
            console.log('\x1b[33m photos\x1b[0m \x1b[32m table created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31m Failed to create photos table\x1b[0m', error)
      }
}

async function favoritesTableModel() {
      const query = `CREATE TABLE IF NOT EXISTS favorites (
                        user_id           INT NOT NULL,
                        advert_id         INT NOT NULL,
                              PRIMARY KEY (user_id, advert_id)
                        );`

      try {
            await pool.query(query)
            console.log('\x1b[33m favorites\x1b[0m \x1b[32m table created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31m Failed to create favorites table\x1b[0m', error)
      }              
}

//-------------------------------------------------------------------------------------------
// CONSTRAINTS
//-------------------------------------------------------------------------------------------

async function commentsTableConstraints() {
      const query = `ALTER TABLE IF EXISTS comments
                        ADD CONSTRAINT FK_comments_users
                              FOREIGN KEY (user_id) REFERENCES users(id),
                        ADD CONSTRAINT FK_comments_adverts
                              FOREIGN KEY (advert_id) REFERENCES adverts(id)`
      
      try {
            await pool.query(query)
            console.log('\x1b[33m comments -> users\x1b[0m \x1b[32m relation created.\x1b[0m')
            console.log('\x1b[33m comments -> adverts\x1b[0m \x1b[32m relation created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[33m comments -> users/adverts\x1b[0m \x1b[31m relation failed.\x1b[0m', error)
      }
}

async function advertsTableConstraints() {
      const query = `ALTER TABLE IF EXISTS adverts
                        ADD CONSTRAINT FK_adverts_users
                              FOREIGN KEY (user_id) REFERENCES users(id),
                        ADD CONSTRAINT FK_adverts_categories
                              FOREIGN KEY (category_id) REFERENCES categories(id)`
      
      try {
            await pool.query(query)
            console.log('\x1b[33m adverts -> users\x1b[0m \x1b[32m relation created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[33m adverts -> users\x1b[0m \x1b[31m relation failed.\x1b[0m', error)
      }
}

async function favoritesTableConstraints() {
      const query = `ALTER TABLE IF EXISTS favorites
                        ADD CONSTRAINT FK_favorites_users
                              FOREIGN KEY (user_id) REFERENCES users(id),
                        ADD CONSTRAINT FK_favorites_adverts
                              FOREIGN KEY (advert_id) REFERENCES adverts(id)`

      try {
            await pool.query(query)
            console.log('\x1b[33m favorites -> users\x1b[0m \x1b[32m relation created.\x1b[0m')
            console.log('\x1b[33m favorites -> adverts\x1b[0m \x1b[32m relation created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[33m favorites -> users/adverts\x1b[0m \x1b[31m relation failed.\x1b[0m', error)
      }                            
}

async function photosTableConstraints() {
      const query = `ALTER TABLE IF EXISTS photos
                        ADD CONSTRAINT FK_photos_adverts
                              FOREIGN KEY (advert_id) REFERENCES adverts(id)
                              ON DELETE CASCADE`

      try {
            await pool.query(query)
            console.log('\x1b[33m photos -> adverts\x1b[0m \x1b[32m relation created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[33m photos -> adverts\x1b[0m \x1b[31m relation failed.\x1b[0m', error)
      }
}

//-------------------------------------------------------------------------------------------
// DELETE
//-------------------------------------------------------------------------------------------

async function deleteAllTables() {
      const query = `DROP TABLE IF EXISTS
                        users,
                        comments,
                        adverts,
                        categories,
                        photos,
                        favorites
                        `

      try {
            await pool.query(query)
            console.log('\x1b[33m All tables\x1b[0m \x1b[32m have been deleted.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31mFailed to remove all tables.\x1b[0m', error)
      }
}

export {
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
      }