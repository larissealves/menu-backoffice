export default function formatRoles (roles) {
    const rolesNewName = {
        view: 'visualizar',
        edit: 'editar',
        admin: 'admin'
    }

    const format = roles.map((item) => {
       return rolesNewName[item];
    });

    return format;
}