# Repository Options

## --repo-cipher-type

Cipher used to encrypt the repository.

The following repository types are supported:

- `none` - The repository is not encrypted
- `aes-256-cbc` - Advanced Encryption Standard with 256 bit key length

```
default: none
example: --repo1-cipher-type=aes-256-cbc
```

## --repo-host

Repository host when operating remotely via SSH.

Make sure that trusted SSH authentication is configured between the PostgreSQL host and the repository host.

When backing up and archiving to a locally mounted filesystem this setting is not required.

```
example: --repo1-host=repo1.domain.com
Deprecated Name: backup-host
```

## --repo-host-cmd

pgBackRest exe path on the repository host.

Required only if the path to pgbackrest is different on the local and repository hosts. If not defined, the repository host exe path will be set the same as the local exe path.

```
example: --repo1-host-cmd=/usr/lib/backrest/bin/pgbackrest
Deprecated Name: backup-cmd
```

## --repo-host-config

pgBackRest repository host configuration file.

Sets the location of the configuration file on the repository host. This is only required if the repository host configuration file is in a different location than the local configuration file.

```
default: /etc/pgbackrest/pgbackrest.conf
example: --repo1-host-config=/conf/pgbackrest/pgbackrest.conf
Deprecated Name: backup-config
```

## --repo-host-config-include-path

pgBackRest repository host configuration include path.

Sets the location of the configuration include path on the repository host. This is only required if the repository host configuration include path is in a different location than the local configuration include path.

```
default: /etc/pgbackrest/conf.d
example: --repo1-host-config-include-path=/conf/pgbackrest/conf.d
```

## --repo-host-config-path

pgBackRest repository host configuration path.

Sets the location of the configuration path on the repository host. This is only required if the repository host configuration path is in a different location than the local configuration path.

```
default: /etc/pgbackrest
example: --repo1-host-config-path=/conf/pgbackrest
```

## --repo-host-port

Repository host port when repo-host is set.

Use this option to specify a non-default port for the repository host protocol. Currently only SSH is supported.

```
allowed: 0-65535
example: --repo1-host-port=25
Deprecated Name: backup-ssh-port
```

## --repo-host-user

Repository host user when repo-host is set.

Defines the user that will be used for operations on the repository host. Preferably this is not the postgres user but rather some other user like pgbackrest. If PostgreSQL runs on the repository host the postgres user can be placed in the pgbackrest group so it has read permissions on the repository without being able to damage the contents accidentally.

```
default: pgbackrest
example: --repo1-host-user=repo-user
Deprecated Name: backup-user
```

## --repo-path

Path where backups and archive are stored.

The repository is where pgBackRest stores backups and archives WAL segments.

It may be difficult to estimate in advance how much space you'll need. The best thing to do is take some backups then record the size of different types of backups (full/incr/diff) and measure the amount of WAL generated per day. This will give you a general idea of how much space you'll need, though of course requirements will likely change over time as your database evolves.

```
default: /var/lib/pgbackrest
example: --repo1-path=/backup/db/backrest
```

## --repo-s3-bucket

AWS S3 repository bucket.

AWS S3 bucket used to store the repository.

pgBackRest repositories can be stored in the bucket root by setting `repo-path=/` but it is usually best to specify a prefix, such as `/repo`, so logs and other AWS generated content can also be stored in the bucket.

```
example: --repo1-s3-bucket=pg-backup
```

## --repo-s3-ca-file

S3 SSL CA File.

Use a CA file other than the system default.

```
example: --repo1-s3-ca-file=/etc/pki/tls/certs/ca-bundle.crt
```

## --repo-s3-ca-path

AWS S3 SSL CA Path.

Use a CA path other than the system default.

```
example: --repo1-s3-ca-path=/etc/pki/tls/certs
```

## --repo-s3-endpoint

AWS S3 repository endpoint.

The AWS end point should be valid for the selected region.

```
example: --repo1-s3-endpoint=s3.amazonaws.com
```

## --repo-s3-host

AWS S3 repository host.

Connect to a host other than the end point. This is typically used for testing.

```
example: --repo1-s3-host=127.0.0.1
```

## --repo-s3-region

AWS S3 repository region.

The AWS region where the bucket was created.

```
example: --repo1-s3-region=us-east-1
```

## --repo-s3-verify-ssl

Verify AWS S3 server certificate.

Disables verification of the S3 server certificate. This should only be used for testing or other scenarios where a certificate has been self-signed.

```
default: y
example: --no-repo1-s3-verify-ssl
```

## --repo-type

Type of storage used for the repository.

The following repository types are supported:

- `cifs` - Like posix, but disables links and directory fsyncs
- `posix` - Posix-compliant file systems
- `s3` - AWS Simple Storage Service

```
default: posix
example: --repo1-type=cifs
```
