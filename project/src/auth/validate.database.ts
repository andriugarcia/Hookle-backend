import driver from '../database'

const signinQuery = 'MATCH (u:User { email: $emailParam }) RETURN u'

export default async function signin(email) {
    let session = driver.session()
    let user = await session.run(signinQuery, {
        emailParam: email,
    })
    session.close()

    if (user.records.length == 0) {
        return null
    }
    const record: any = user.records[0]
    return record._fields[0].properties
}
