import './footer.scss';

const credentials = [
    {
        name: 'git',
        url: '',
    },
];

export function Footer() {
    return (
        <footer className="app-footer">
            {credentials.map((item, index) => (
                <a href={item.url} className="link">{item.name}</a>
            ))}
        </footer>
    );
}
