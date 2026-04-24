$UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36"
$BASE = "..\public\media\routes\urbanizacao-rio\photos"

function Download($url, $path) {
    $dir = Split-Path $path
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    $result = curl -s -L -A $UA $url -o $path -w "%{http_code}" 2>&1
    $size = if (Test-Path $path) { [math]::Round((Get-Item $path).Length / 1KB) } else { 0 }
    Write-Host "  $result - $(Split-Path $path -Leaf) ($size KB)"
}

$photos = @{
    "paco-imperial"           = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Pa%C3%A7o_Imperial_-_Rio_de_Janeiro_-_20220826172010.jpg/960px-Pa%C3%A7o_Imperial_-_Rio_de_Janeiro_-_20220826172010.jpg"
    "chafariz-valentim"       = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Chafariz_do_Mestre_Valentim_-_Rio_de_Janeiro_-_20220924092531.jpg/960px-Chafariz_do_Mestre_Valentim_-_Rio_de_Janeiro_-_20220924092531.jpg"
    "arco-do-teles"           = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Arco_do_Teles_Centro_da_cidade.jpg/960px-Arco_do_Teles_Centro_da_cidade.jpg"
    "ccbb"                    = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Centro_Cultural_Banco_do_Brasil_-_Rio_de_Janeiro.jpg/960px-Centro_Cultural_Banco_do_Brasil_-_Rio_de_Janeiro.jpg"
    "candelaria"              = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Igreja_de_Nossa_Senhora_da_Candel%C3%A1ria_-_Rio_de_Janeiro_-_20220625120400.jpg/960px-Igreja_de_Nossa_Senhora_da_Candel%C3%A1ria_-_Rio_de_Janeiro_-_20220625120400.jpg"
    "centro-cultural-justica" = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Centro_Cultural_Justi%C3%A7a_Federal_01.jpg/960px-Centro_Cultural_Justi%C3%A7a_Federal_01.jpg"
    "rua-do-ouvidor"          = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/RuaDoOuvidor.JPG/960px-RuaDoOuvidor.JPG"
    "confeitaria-colombo"     = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Confeitaria_Colombo_-_Rio_de_Janeiro_-_20230323130249.jpg/960px-Confeitaria_Colombo_-_Rio_de_Janeiro_-_20230323130249.jpg"
    "igreja-sao-francisco"    = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Igreja_de_S%C3%A3o_Francisco_de_Paula%2C_Rio_de_Janeiro.JPG/960px-Igreja_de_S%C3%A3o_Francisco_de_Paula%2C_Rio_de_Janeiro.JPG"
    "real-gabinete"           = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Real_Gabinete_Portugu%C3%AAs_de_Leitura_03.jpg/960px-Real_Gabinete_Portugu%C3%AAs_de_Leitura_03.jpg"
    "theatro-municipal"       = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Teatro_Municipal_do_Rio_de_Janeiro_%28007_IMG_2517%29.jpg/960px-Teatro_Municipal_do_Rio_de_Janeiro_%28007_IMG_2517%29.jpg"
    "biblioteca-nacional"     = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Biblioteca_Nacional_do_Brasil_-_Rio_de_Janeiro_-_20230921132823.jpg/960px-Biblioteca_Nacional_do_Brasil_-_Rio_de_Janeiro_-_20230921132823.jpg"
    "museu-belas-artes"       = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Museu_Nacional_de_Belas_Artes_02.jpg/960px-Museu_Nacional_de_Belas_Artes_02.jpg"
    "cinelandia"              = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Cinel%C3%A2ndia%2C_Rio_de_Janeiro.jpg/960px-Cinel%C3%A2ndia%2C_Rio_de_Janeiro.jpg"
    "av-rio-branco"           = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Avenida_Rio_Branco%2C_Rio_de_Janeiro.jpg/960px-Avenida_Rio_Branco%2C_Rio_de_Janeiro.jpg"
    "central-do-brasil"       = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Esta%C3%A7%C3%A3o_Central_do_Brasil_-_Rio_de_Janeiro_-_20240518110719.jpg/960px-Esta%C3%A7%C3%A3o_Central_do_Brasil_-_Rio_de_Janeiro_-_20240518110719.jpg"
}

$thumbs = @{
    "paco-imperial"           = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Pa%C3%A7o_Imperial_-_Rio_de_Janeiro_-_20220826172010.jpg/330px-Pa%C3%A7o_Imperial_-_Rio_de_Janeiro_-_20220826172010.jpg"
    "chafariz-valentim"       = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Chafariz_do_Mestre_Valentim_-_Rio_de_Janeiro_-_20220924092531.jpg/330px-Chafariz_do_Mestre_Valentim_-_Rio_de_Janeiro_-_20220924092531.jpg"
    "arco-do-teles"           = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Arco_do_Teles_Centro_da_cidade.jpg/330px-Arco_do_Teles_Centro_da_cidade.jpg"
    "ccbb"                    = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Centro_Cultural_Banco_do_Brasil_-_Rio_de_Janeiro.jpg/330px-Centro_Cultural_Banco_do_Brasil_-_Rio_de_Janeiro.jpg"
    "candelaria"              = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Igreja_de_Nossa_Senhora_da_Candel%C3%A1ria_-_Rio_de_Janeiro_-_20220625120400.jpg/330px-Igreja_de_Nossa_Senhora_da_Candel%C3%A1ria_-_Rio_de_Janeiro_-_20220625120400.jpg"
    "centro-cultural-justica" = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Centro_Cultural_Justi%C3%A7a_Federal_01.jpg/330px-Centro_Cultural_Justi%C3%A7a_Federal_01.jpg"
    "rua-do-ouvidor"          = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/RuaDoOuvidor.JPG/330px-RuaDoOuvidor.JPG"
    "confeitaria-colombo"     = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Confeitaria_Colombo_-_Rio_de_Janeiro_-_20230323130249.jpg/330px-Confeitaria_Colombo_-_Rio_de_Janeiro_-_20230323130249.jpg"
    "igreja-sao-francisco"    = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Igreja_de_S%C3%A3o_Francisco_de_Paula%2C_Rio_de_Janeiro.JPG/330px-Igreja_de_S%C3%A3o_Francisco_de_Paula%2C_Rio_de_Janeiro.JPG"
    "real-gabinete"           = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Real_Gabinete_Portugu%C3%AAs_de_Leitura_03.jpg/330px-Real_Gabinete_Portugu%C3%AAs_de_Leitura_03.jpg"
    "theatro-municipal"       = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Teatro_Municipal_do_Rio_de_Janeiro_%28007_IMG_2517%29.jpg/330px-Teatro_Municipal_do_Rio_de_Janeiro_%28007_IMG_2517%29.jpg"
    "biblioteca-nacional"     = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Biblioteca_Nacional_do_Brasil_-_Rio_de_Janeiro_-_20230921132823.jpg/330px-Biblioteca_Nacional_do_Brasil_-_Rio_de_Janeiro_-_20230921132823.jpg"
    "museu-belas-artes"       = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Museu_Nacional_de_Belas_Artes_02.jpg/330px-Museu_Nacional_de_Belas_Artes_02.jpg"
    "cinelandia"              = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Cinel%C3%A2ndia%2C_Rio_de_Janeiro.jpg/330px-Cinel%C3%A2ndia%2C_Rio_de_Janeiro.jpg"
    "av-rio-branco"           = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Avenida_Rio_Branco%2C_Rio_de_Janeiro.jpg/330px-Avenida_Rio_Branco%2C_Rio_de_Janeiro.jpg"
    "central-do-brasil"       = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Esta%C3%A7%C3%A3o_Central_do_Brasil_-_Rio_de_Janeiro_-_20240518110719.jpg/330px-Esta%C3%A7%C3%A3o_Central_do_Brasil_-_Rio_de_Janeiro_-_20240518110719.jpg"
}

foreach ($poi in $photos.Keys) {
    Write-Host "`n[$poi]"
    Download $photos[$poi]  "$BASE\$poi\main.jpg"
    Download $thumbs[$poi]  "$BASE\$poi\thumb.jpg"
}

# Delete test file if exists
if (Test-Path "test_paco.jpg") { Remove-Item "test_paco.jpg" }

Write-Host "`nConcluido!"
