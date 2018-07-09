---
home: true
heroImage: /logo.png
actionText: Get Started →
actionLink: /guide/
footer: Copyright© 2015-2018, The PostgreSQL Global Development Group, MIT License. Updated May 7, 2018
features:
- title: Parallel Backup & Restore
  details: Compression is usually the bottleneck during backup operations but, even with now ubiquitous multi-core servers, most database backup solutions are still single-process. pgBackRest solves the compression bottleneck with parallel processing. Utilizing multiple cores for compression makes it possible to achieve 1TB/hr raw throughput even on a 1Gb/s link. More cores and a larger pipe lead to even higher throughput.
- title: Local or Remote Operation
  details: A custom protocol allows pgBackRest to backup, restore, and archive locally or remotely via SSH with minimal configuration. An interface to query PostgreSQL is also provided via the protocol layer so that remote access to PostgreSQL is never required, which enhances security.
- title: Full, Incremental, & Differential Backups
  details: Full, differential, and incremental backups are supported. pgBackRest is not susceptible to the time resolution issues of rsync, making differential and incremental backups completely safe.
- title: Backup Rotation & Archive Expiration
  details: Retention polices can be set for full and differential backups to create coverage for any timeframe. WAL archive can be maintained for all backups or strictly for the most recent backups. In the latter case WAL required to make older backups consistent will be maintained in the archive.
- title: Backup Integrity
  details: Checksums are calculated for every file in the backup and rechecked during a restore. After a backup finishes copying files, it waits until every WAL segment required to make the backup consistent reaches the repository.
- title: Page Checksums
  details: PostgreSQL has supported page-level checksums since 9.3. If page checksums are enabled pgBackRest will validate the checksums for every file that is copied during a backup. All page checksums are validated during a full backup and checksums in files that have changed are validated during differential and incremental backups.
# - title: Backup Resume
#   details: An aborted backup can be resumed from the point where it was stopped. Files that were already copied are compared with the checksums in the manifest to ensure integrity. Since this operation can take place entirely on the backup server, it reduces load on the database server and saves time since checksum calculation is faster than compressing and retransmitting data.
# - title: Streaming Compression & Checksums
#   details: Compression and checksum calculations are performed in stream while files are being copied to the repository, whether the repository is located locally or remotely.
# - title: Delta Restore
#   details: The manifest contains checksums for every file in the backup so that during a restore it is possible to use these checksums to speed processing enormously.
# - title: Parallel, Asynchronous WAL Push & Get
#   details: Dedicated commands are included for pushing WAL to the archive and getting WAL from the archive. Both commands support parallelism to accelerate processing and run asynchronously to provide the fastest possible response time to PostgreSQL.
# - title: Tablespace & Link Support
#   details: Tablespaces are fully supported and on restore tablespaces can be remapped to any location. It is also possible to remap all tablespaces to one location with a single command which is useful for development restores. File and directory links are supported for any file or directory in the PostgreSQL cluster. 
# - title: Amazon S3 Support
#   details: pgBackRest repositories can be stored on Amazon S3 to allow for virtually unlimited capacity and retention.
# - title: Encryption
#   details: pgBackRest can encrypt the repository to secure backups wherever they are stored.
# - title: Compatibility with PostgreSQL >= 8.3
#   details: pgBackRest includes support for versions down to 8.3, since older versions of PostgreSQL are still regularly utilized.
---


## Getting Started

pgBackRest strives to be easy to configure and operate:

- [User guide](/guide/) for Debian & Ubuntu / PostgreSQL 9.4.
- [Command reference](/commands/) for command-line operations.
- [Configuration reference](/config/) for creating pgBackRest configurations.

## Contributions

Contributions to pgBackRest are always welcome!

Code fixes or new features can be submitted via pull requests. Ideas for new features and improvements to existing functionality or documentation can be submitted as [issues](https://github.com/pgbackrest/pgbackrest/issues). You may want to check the [Feature Board](https://github.com/pgbackrest/pgbackrest/projects/2) to see if your suggestion has already been submitted.

Bug reports should be submitted as [issues](https://github.com/pgbackrest/pgbackrest/issues). Please provide as much information as possible to aid in determining the cause of the problem.

You will always receive credit in the [release notes](/releases/) for your contributions.

## Support

pgBackRest is completely free and open source under the [MIT](https://github.com/pgbackrest/pgbackrest/blob/master/LICENSE) license. You may use it for personal or commercial purposes without any restrictions whatsoever. Bug reports are taken very seriously and will be addressed as quickly as possible.

Creating a robust disaster recovery policy with proper replication and backup strategies can be a very complex and daunting task. You may find that you need help during the architecture phase and ongoing support to ensure that your enterprise continues running smoothly.

[Crunchy Data](http://www.crunchydata.com/) provides packaged versions of pgBackRest for major operating systems and expert full life-cycle commercial support for pgBackRest and all things PostgreSQL. [Crunchy Data](http://www.crunchydata.com/) is committed to providing open source solutions with no vendor lock-in, ensuring that cross-compatibility with the community version of pgBackRest is always strictly maintained.

Please visit [Crunchy Data](http://www.crunchydata.com/) for more information.

## Recognition

Primary recognition goes to Stephen Frost for all his valuable advice and criticism during the development of pgBackRest.

[Crunchy Data](http://www.crunchydata.com/) has contributed significant time and resources to pgBackRest and continues to actively support development. [Resonate](http://www.resonate.com/) also contributed to the development of pgBackRest and allowed early (but well tested) versions to be installed as their primary PostgreSQL backup solution.

[Armchair](https://thenounproject.com/search/?q=lounge+chair&i=129971) graphic by [Sandor Szabo](https://thenounproject.com/sandorsz).