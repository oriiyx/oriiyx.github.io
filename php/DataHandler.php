<?php


/**
 * Class DataHandler
 */
class DataHandler
{
    /** @var string $data */
    private $data;

    const JSON_FILE_NAME = 'questions.json';
    const JSON_BACKUP_FILE_NAME = 'backup-questions.json';

    /**
     * @param string $jsonStringData
     */
    public function handle(string $jsonStringData)
    {
        $this->setData($jsonStringData);
        $this->makeBackup();
        $this->writeData();
    }

    /**
     * @param string $data
     */
    private function setData(string $data)
    {
        $this->data = $data;
    }

    private function makeBackup(): void
    {
        $file = fopen('../data/' . $this::JSON_FILE_NAME, 'r');
        $backupFileData = fread($file, filesize('../data/' . $this::JSON_FILE_NAME));
        fclose($file);

        if ($this->isJson($backupFileData)) {
            $backupFile = fopen('../data/' . $this::JSON_BACKUP_FILE_NAME, 'w');
            fwrite($backupFile, $backupFileData);
            fclose($backupFile);
        }

    }

    private function writeData(): void
    {
        if ($this->isJson($this->data)) {
            $file = fopen('../data/' . $this::JSON_FILE_NAME, 'w');
            fwrite($file, $this->data);
            fclose($file);
        }
    }

    /**
     * @param string $jsonString
     * @return bool
     */
    private function isJson(string $jsonString): bool
    {
        json_decode($jsonString);
        return json_last_error() === JSON_ERROR_NONE;
    }
}
