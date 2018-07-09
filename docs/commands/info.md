# info

The info command operates on a single stanza or all stanzas. Text output is the default and gives a human-readable summary of backups for the stanza(s) requested. This format is subject to change with any release.

For machine-readable output use `--output=json`. The JSON output contains far more information than the text output and is kept stable unless a bug is found.

## --output

Output format.

The following output types are supported:

- `text` - Human-readable summary of backup information.
- `json` - Exhaustive machine-readable backup information in JSON format.

```
default: text
example: --output=json
```