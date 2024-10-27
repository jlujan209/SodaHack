# Secure Browsing for Everyone

## Modules:

<table>
    <tr>
        <td>Browser</td>
    </tr>
    <tr>
        <td>Blockchain Encrypted Password Manager</td>
    </tr>
    <tr>
        <td>VPN</td>
    </tr>
    <tr>
        <td>Suspicious URL detection</td>
    </tr>
    <tr>
        <td>Sandbox (safe browsing mode)</td>
    </tr>
    <tr>
        <td>Configurable Firewall</td>
    </tr>
    <tr>
        <td>Stretch Goal: Suspicious Email detection</td>
    </tr>
</table>


## Browser Setup

1. Get depot_tools:
``git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git C:\depot_tools``

2. Add depot_tools to system path.

3. Fetching Chromium Source:
``& "<path to depot tools>\fetch" --nohooks chromium``
``cd source``

4. Sync the code: ``gclient sync``