# ============================================
# SETUP AI BOTS - HOA TUOI THANH NGOC
# Telegram Bot + Zalo Bot + Ollama
# ============================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SETUP AI BOTS - HOA TUOI THANH NGOC  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# --- BUOC 1: Kiem tra bien moi truong ---
Write-Host "[1/5] Kiem tra OLLAMA_MODELS..." -ForegroundColor Yellow
$ollamaModels = [System.Environment]::GetEnvironmentVariable("OLLAMA_MODELS", "Machine")
if ($ollamaModels) {
    Write-Host "    OK: OLLAMA_MODELS = $ollamaModels" -ForegroundColor Green
} else {
    [System.Environment]::SetEnvironmentVariable("OLLAMA_MODELS", "D:\ollama-models", "Machine")
    $env:OLLAMA_MODELS = "D:\ollama-models"
    Write-Host "    OK: Da set OLLAMA_MODELS = D:\ollama-models" -ForegroundColor Green
}

# --- BUOC 2: Kiem tra Ollama ---
Write-Host ""
Write-Host "[2/5] Kiem tra Ollama..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:11434/api/tags" -Method Get -TimeoutSec 5
    Write-Host "    OK: Ollama dang chay!" -ForegroundColor Green
    $models = $response.models
    if ($models.Count -gt 0) {
        Write-Host "    Models da cai:" -ForegroundColor Green
        foreach ($m in $models) { Write-Host "      - $($m.name)" -ForegroundColor White }
    }
} catch {
    Write-Host "    LOI: Ollama chua chay! Hay mo Ollama truoc roi chay lai." -ForegroundColor Red
    pause; exit
}

# --- BUOC 3: Tai model qwen2.5:3b ---
Write-Host ""
Write-Host "[3/5] Kiem tra model qwen2.5:3b..." -ForegroundColor Yellow
$hasModel = $models | Where-Object { $_.name -like "qwen2.5:3b*" }
if ($hasModel) {
    Write-Host "    OK: qwen2.5:3b da co san!" -ForegroundColor Green
} else {
    Write-Host "    Dang tai qwen2.5:3b (~2GB)... Vui long doi 3-5 phut" -ForegroundColor Yellow
    & ollama pull qwen2.5:3b
    Write-Host "    OK: Tai xong!" -ForegroundColor Green
}

# --- BUOC 4: Kiem tra n8n ---
Write-Host ""
Write-Host "[4/5] Kiem tra n8n..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri "http://localhost:5678" -TimeoutSec 5 -UseBasicParsing | Out-Null
    Write-Host "    OK: n8n dang chay!" -ForegroundColor Green
} catch {
    Write-Host "    Khoi dong n8n trong cua so moi..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npx n8n"
    Start-Sleep -Seconds 12
    Write-Host "    OK: n8n da khoi dong!" -ForegroundColor Green
}

# --- BUOC 5: Tao workflow JSON ---
Write-Host ""
Write-Host "[5/5] Tao workflow Telegram..." -ForegroundColor Yellow

$workflowDir = "D:\ai-bots-workflows"
New-Item -ItemType Directory -Path $workflowDir -Force | Out-Null

@'
{
  "name": "Telegram Bot - Hoa Tuoi Thanh Ngoc",
  "nodes": [
    {
      "parameters": {
        "updates": ["message"],
        "additionalFields": {}
      },
      "id": "node-1",
      "name": "Telegram Trigger",
      "type": "n8n-nodes-base.telegramTrigger",
      "typeVersion": 1.1,
      "position": [240, 300],
      "webhookId": "telegram-hoa-ngoc"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "http://localhost:11434/api/chat",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [{"name": "Content-Type", "value": "application/json"}]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"model\": \"qwen2.5:3b\",\n  \"stream\": false,\n  \"messages\": [\n    {\n      \"role\": \"system\",\n      \"content\": \"Ban la Ngoc - tu van vien cua Hoa Tuoi Thanh Ngoc, Binh Thanh TP.HCM. Nhiem vu: tu van hoa tuoi, gia ca, dip su dung, giao hang. Luon than thien, nhiet tinh, dung tieng Viet. Khong biet thi noi se ho tro them.\"\n    },\n    {\n      \"role\": \"user\",\n      \"content\": \"{{ $json.message.text }}\"\n    }\n  ]\n}"
      },
      "id": "node-2",
      "name": "Ollama AI",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [480, 300]
    },
    {
      "parameters": {
        "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
        "text": "={{ $json.message.content }}",
        "additionalFields": {}
      },
      "id": "node-3",
      "name": "Telegram Reply",
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [720, 300]
    }
  ],
  "connections": {
    "Telegram Trigger": {
      "main": [[{"node": "Ollama AI", "type": "main", "index": 0}]]
    },
    "Ollama AI": {
      "main": [[{"node": "Telegram Reply", "type": "main", "index": 0}]]
    }
  }
}
'@ | Out-File -FilePath "$workflowDir\telegram-bot.json" -Encoding utf8

Write-Host "    OK: Workflow da luu: $workflowDir\telegram-bot.json" -ForegroundColor Green

# --- HOAN THANH ---
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  SETUP HOAN TAT!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "BUOC TIEP THEO:" -ForegroundColor Cyan
Write-Host "  1. Mo n8n: http://localhost:5678" -ForegroundColor White
Write-Host "  2. Import file: $workflowDir\telegram-bot.json" -ForegroundColor White
Write-Host "  3. Them Telegram Token vao Credentials" -ForegroundColor White
Write-Host "  4. Bat workflow va test!" -ForegroundColor White
Write-Host ""
Read-Host "Nhan Enter de mo n8n..."
Start-Process "http://localhost:5678"
