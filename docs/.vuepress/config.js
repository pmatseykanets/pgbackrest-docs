module.exports = {
    base: '/pgbackrest-docs/',
    title: 'pgBackRest',
    description: 'Reliable PostgreSQL Backup & Restore',
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
    ],
    serviceWorker: true,
    themeConfig: {
        repo: 'pgbackrest/pgbackrest',
        editLinks: true,
        nav: [
            {
                text: 'Guide',
                link: '/guide/',
            },
            {
                text: 'Releases',
                link: '/releases/',
            },
            {
                text: 'Configuration',
                link: '/config/'
            },
            {
                text: 'Commands',
                link: '/commands/'
            }
        ],
        sidebar: {
            '/guide/': [
                {
                    title: 'Guide',
                    collapsable: false,
                    children: [
                        '',
                        'features',
                        'concepts',
                        'installation',
                        'quick_start',
                        'backup',
                        'monitoring',
                        'retention',
                        'restore',
                        'point_in_time_recovery',
                        's3_support',
                        'deleting_stanza',
                        'dedicated_repository_host',
                        'parallel_backup_restore',
                        'starting_and_stopping',
                        'replication',
                        'asynchronous_archiving',
                        'backup_from_standby',
                        'upgrading_postgresql',
                    ]
                },
            ],
            '/commands/': [
                {
                    title: 'Commands',
                    collapsable: false,
                    children: [
                        '',
                        'general_options',
                        'log_options',
                        'repository_options',
                        'stanza_options',
                        'archive_get',
                        'archive_push',
                        'backup',
                        'check',
                        'expire',
                        'info',
                        'restore',
                        'stanza_create',
                        'stanza_delete',
                        'stanza_upgrade',
                        'start',
                        'stop',
                        'help',
                        'version',
                    ]
                },
            ],
            '/config/': [
                {
                    title: 'Configuration',
                    collapsable: false,
                    children: [
                        '',
                        'archive',
                        'backup',
                        'general',
                        'log',
                        'repository',
                        'restore',
                        'stanza',
                    ]
                }
            ],
            '/releases/': [
                {
                    title: 'Releases',
                    collapsable: false,
                    children: [
                        '',
                    ]
                },
                {
                    title: 'Current',
                    collapsable: false,
                    children: [
                        'v2_02',
                    ]
                },
                {
                    title: 'Stable',
                    collapsable: false,
                    children: [
                        'v2_01',
                        'v2_00',
                    ]
                },
                {
                    title: 'Pre-Stable',
                    collapsable: false,
                    children: [
                    ]
                }
            ]
        }
    }
}